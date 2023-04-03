import React, { useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import UserManagerEditFormWrapper from "./UserManagerEditFromWrapper";
import UserManagerFormWrapper from "./UserManagerFormWrapper";
import UserManagerTableWrapper from "./UserManagerTableWrapper";

export default function CustomersTab(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();
    const profile = useSelector((state: any) =>state.data.profile)

    return (
        <ContainerLayout>
             <UserManagerTableWrapper roleId={5} editRow={(value: any)=>{
              setValue(value)
              navigate('/app/user-manager/edit-form')
             }} 
             create={()=>{
              setValue(null)
              navigate(`/app/user-manager/${"create-form"}`)
             }}/>
           {tab === "create-form" && (
             <UserManagerFormWrapper back={()=>navigate(`/app/user-manager/${'table'}`)}/>
           )}
            {tab === "edit-form" && (
             <UserManagerEditFormWrapper selectValue={value} back={()=>navigate(`/app/user-manager/${'table'}`)}/>
           )}
        </ContainerLayout>
    )
}