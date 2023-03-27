import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import UserManagerEditClaimForm from "./UserManagerEditClaim";
import UserManagerEditForm from "./UserManagerEditForm";
import UserManagerEditPasswordForm from "./UserManagerEditPassword";
import UserManagerEditRoleForm from "./UserManagerEditRole";

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

export default function UserManagerEditFormWrapper({back, selectValue}:UserManagerFormWrapperProps){

    const navigation = useNavigate();
    const [claims, setClaims] = useState<any>([]);
    const [roles, setRoles] = useState<any>([]);
   
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        phoneNumber: "",
        address: "",
    })

    const [initialPassword, setInitialPassword] = useState({
        passwordHash: ""
    })

    const [initialRole, setInitialRole] = useState({
        roleName: ""
    })

    const [initialClaim, setInitialClaim] = useState({
        claim: ""
    })

    useEffect(()=>{
        if(Boolean(selectValue)){
                request.get(`/UserManager/${selectValue.id}`,{
                  headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
                }).then((respon: any)=>{
                    setInitialValues(respon.data)
                    setClaims(respon.data.userClaim);
                    setRoles(respon.data.userRoles)
                }).catch((error)=>toast.error(error.message))
                
        }
    },[setInitialValues,selectValue, selectValue, request, toast, setClaims])

    const submit = useCallback((value: any)=>{
        const data = {
            id: Number(selectValue.id),
            firstName: value.firstName,
            lastName: value.lastName,
            address: value.address,
            phoneNumber: value.phoneNumber,
        }
        request.put("/UserManager", 
        data,
            {
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
            }).then((response: any)=>{
                toast.success("Updated!")
                navigation('/app/user-manager/table')
            }).catch((err: any)=>toast.error("Fail!"))
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
            <div className="row">
                <div className="col-12 mb-3">
                    <UserManagerEditForm initialValues={initialValues} setInitialValues={setInitialValues} submit={submit}/>
                </div>
                <div className="col-4">
                    <UserManagerEditPasswordForm initialValues={initialPassword} setInitialValues={setInitialPassword} submit={submit}/>
                </div>
                <div className="col-4">
                    <UserManagerEditRoleForm initialValues={initialRole} setInitialValues={setInitialRole} submit={submit}/>
                </div>
                <div className="col-4">
                    <UserManagerEditClaimForm initialValues={initialClaim} setInitialValues={setInitialClaim} submit={submit}/>
                </div>
            </div>

    </TabPage>
    )}