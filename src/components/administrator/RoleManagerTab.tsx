import React, { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import RoleManagerFormWrapper from "../role/RoleManagerFormWrapper";
import RoleManagerTableWrapper from "../role/RoleManagerTableWrapper";

export default function RoleManagerTab(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();
    return (
        <ContainerLayout>
             <RoleManagerTableWrapper editRow={(value: any)=>{
              setValue(value)
              navigate('/app/role-manager/form')
             }} 
             create={()=>{
              setValue(null)
              navigate(`/app/role-manager/${"form"}`)
             }}/>
        </ContainerLayout>
    )
}