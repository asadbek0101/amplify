import React, { useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import UserManagerEditFormWrapper from "../components/user/UserManagerEditFromWrapper";
import UserManagerFormWrapper from "../components/user/UserManagerFormWrapper";
import UserManagerTableWrapper from "../components/user/UserManagerTableWrapper";

export default function UserManagerContainer(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();
    const profile = useSelector((state: any) =>state.data.profile)


    return (
        <ContainerLayout>
           {tab === "table" && (
             <UserManagerTableWrapper editRow={(value: any)=>{
              setValue(value)
              navigate('/app/user-manager/edit-form')
             }} 
             create={()=>{
              setValue(null)
              navigate(`/app/user-manager/${"create-form"}`)
             }}/>
           )}
           {tab === "create-form" && (
             <UserManagerFormWrapper back={()=>navigate(`/app/user-manager/${'table'}`)}/>
           )}
            {tab === "edit-form" && (
             <UserManagerEditFormWrapper selectValue={value} back={()=>navigate(`/app/user-manager/${'table'}`)}/>
           )}
        </ContainerLayout>
    )
}