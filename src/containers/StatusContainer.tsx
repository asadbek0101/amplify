import React, { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import StatusFormWrapper from "../components/status/StatusFormWrapper";
import StatusTableWrapper from "../components/status/StatusTableWrapper";

export default function StatusContainer(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();
    return (
        <ContainerLayout>
           {tab === "table" && (
             <StatusTableWrapper selectRow={(value: any)=>{
              setValue(value)
              navigate('/app/status/form')
             }} 
             create={()=>{
              setValue(null)
              navigate(`/app/status/${"form"}`)
             }}/>
           )}
           {tab === "form" && (
             <StatusFormWrapper selectValue={value} back={()=>navigate(`/app/status/${'table'}`)}/>
           )}
        </ContainerLayout>
    )
}