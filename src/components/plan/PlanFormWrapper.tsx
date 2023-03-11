import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import PlanForm from "./PlanForm";

interface BranchFormWrapperProps{
    readonly back: () => void
    readonly selectValue: any;
}

export default function PlanFormWrapper({back, selectValue}:BranchFormWrapperProps){

    const navigation = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: "",
        cost: "",
        description: ""
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
        request.put("/Plan", 
        data,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Updated!")
                navigation('/app/plan/table')
            }).catch((err: any)=>toast.error("Fail!"))
       }else{
        const data = {
            ...value,
            cost: Number(value.cost)
        }
        request.post("/Plan", 
        data,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Added!")
                navigation('/app/plan/table')
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
        <PlanForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}