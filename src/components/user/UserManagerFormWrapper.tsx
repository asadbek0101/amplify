import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import UserManagerForm from "./UserManagerForm";

interface UserManagerFormWrapperProps{
    readonly back?: () => void
}

export default function UserManagerFormWrapper({back}:UserManagerFormWrapperProps){

    const navigation = useNavigate();

    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        phoneNumber: "",
        address: "",
        roleName: "",
        passwordHash: "",
        claim: ""
    })
    const submit = useCallback((value: any)=>{
        const data = {
            ...value,
            cost: Number(value.cost)
        }
        request.post("/UserManager", 
        data,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Added!")
                navigation('/app/user-manager/table')
            }).catch((err: any)=>toast.error("Fail!"))
    },[request])

    return (
    <TabPage 
        childrenClassName="p-3 pt-4">
        <UserManagerForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}