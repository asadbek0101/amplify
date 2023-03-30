import React, { useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import BranchFormWrapper from "../branch/BranchFormWrapper";
import BranchTableWrapper from "../branch/BranchTableWrapper";

export default function BranchTab(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();

    return (
        <ContainerLayout>
             <BranchTableWrapper selectRow={(value: any)=>{
              setValue(value)
              navigate('/app/branch/form')
             }} 
             create={()=>{
              setValue(null)
              navigate(`/app/branch/${"form"}`)
             }}/>
           {tab === "form" && (
             <BranchFormWrapper selectValue={value} back={()=>navigate(`/app/branch/${'table'}`)}/>
           )}
        </ContainerLayout>
    )
}