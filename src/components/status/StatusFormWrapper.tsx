import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import StatusForm from "./StatusForm";

interface StatusFormWrapperProps{
    readonly back: () => void
    readonly selectValue: any;
}

export default function StatusFormWrapper({back, selectValue}:StatusFormWrapperProps){

    const navigation = useNavigate();
    const [search, setSearch] = useSearchParams();

    const [initialValues, setInitialValues] = useState({
        name: "",
        cost: "",
        description: ""
    })

    useEffect(()=>{
        if(Boolean(selectValue)){
            setInitialValues(selectValue)
        }else if(!Boolean(selectValue)){
            navigation("/app/status/table")
        }
    },[setInitialValues, selectValue, navigation])

    const submit = useCallback((value: any)=>{
       if(Boolean(selectValue)){
        const data = {
            ...value,
            id: selectValue.id
        }
        request.put("/Status", 
        data,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Updated!")
                navigation('/app/status/table')
            }).catch((err: any)=>toast.error("Fail!"))
       }else{
        const data = {
            ...value,
            cost: Number(value.cost)
        }
        request.post("/Status", 
        data,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Added!")
                navigation('/app/status/table')
            }).catch((err: any)=>toast.error("Fail!"))
            }
    },[request])

    return (
    <TabPage 
        childrenClassName="p-3 pt-4"
        headerComponent={
            <Button onClick={back} className="bg-gold text-light mb-2 px-2 py-1">
                Back
            </Button>
        }
        >
        <StatusForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}