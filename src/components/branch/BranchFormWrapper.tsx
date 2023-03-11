import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import BranchForm from "./BranchForm";

interface BranchFormWrapperProps{
    readonly back: () => void
    readonly selectValue: any;
}

export default function BranchFormWrapper({back, selectValue}:BranchFormWrapperProps){

    const navigation = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        city: "",
        country: "",
        phone: "",
        address: "",
        code: "",
    })

    useEffect(()=>{
        if(Boolean(selectValue)){
            setInitialValues(selectValue)
        }
    },[setInitialValues, selectValue])

    const submit = useCallback((value: any)=>{
       if(Boolean(selectValue)){
        const data = {
            ...value,
            id: selectValue.id
        }
        request.put("/Branch", 
        data,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Updated!")
                navigation('/app/branch/table')
            }).catch((err: any)=>toast.error("Fail!"))
       }else{
        request.post("/Branch", 
        value,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Added!")
                navigation('/app/branch/table')
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
        <BranchForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}