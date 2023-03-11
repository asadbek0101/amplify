import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import UserManagerForm from "./UserManagerForm";

interface UserManagerFormWrapperProps{
    readonly back: () => void
    readonly selectValue: any;
}

// "firstName": "string",
// "lastName": "string",
// "userName": "string",
// "email": "string",
// "phoneNumber": "string",
// "address": "string",
// "roleName": "string",
// "passwordHash": "string"

export default function UserManagerFormWrapper({back, selectValue}:UserManagerFormWrapperProps){

    const navigation = useNavigate();

    const [initialValues, setInitialValues] = useState({
        firstName: "",
        userName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        roleName: "",
        passwordHash: "",
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
        request.put("/UserManager", 
        data,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Updated!")
                navigation('/app/role-manager/table')
            }).catch((err: any)=>toast.error("Fail!"))
       }else{
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
        <UserManagerForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}