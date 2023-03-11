import React, { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import RoleFormWrapper from "../components/role/RoleManagerFormWrapper";
import RoleTableWrapper from "../components/role/RoleManagerTableWrapper";

export default function RoleManagerContainer(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();
    return (
        <ContainerLayout>
           {tab === "table" && (
             <RoleTableWrapper editRow={(value: any)=>{
              setValue(value)
              navigate('/app/role-manager/form')
             }} 
             create={()=>{
              setValue(null)
              navigate(`/app/role-manager/${"form"}`)
             }}/>
           )}
           {tab === "form" && (
             <RoleFormWrapper selectValue={value} back={()=>navigate(`/app/role-manager/${'table'}`)}/>
           )}
        </ContainerLayout>
    )
}