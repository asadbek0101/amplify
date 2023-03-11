import React, { useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import BranchFormWrapper from "../components/branch/BranchFormWrapper";
import BranchTableWrapper from "../components/branch/BranchTableWrapper";

export default function BranchContainer(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();

    return (
        <ContainerLayout>
           {tab === "table" && (
             <BranchTableWrapper selectRow={(value: any)=>{
              setValue(value)
              navigate('/app/branch/form')
             }} 
             create={()=>{
              setValue(null)
              navigate(`/app/branch/${"form"}`)
             }}/>
           )}
           {tab === "form" && (
             <BranchFormWrapper selectValue={value} back={()=>navigate(`/app/branch/${'table'}`)}/>
           )}
        </ContainerLayout>
    )
}