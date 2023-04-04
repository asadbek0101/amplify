import React, { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import TabPage from "../tabs/TabPage";
import UserManagerForm from "./UserManagerForm";
import { useUserApiContext } from "../../api/user/UserApiContext";

interface UserManagerFormWrapperProps{
    readonly back?: () => void
}

export default function UserManagerFormWrapper({back}:UserManagerFormWrapperProps){

    const { UserApi } = useUserApiContext();
    const [searchParams, setSearchParams] = useSearchParams();

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
        }
        UserApi.createUser(data).then(()=>{
                toast.success("Added!")
                setSearchParams({pageType: "table"})
            }).catch(()=>toast.error("Fail!"))
    },[UserApi, setSearchParams, toast])

    return (
    <TabPage 
        childrenClassName="p-3 pt-4">
        <UserManagerForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}