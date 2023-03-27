import React, { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import PlanFormWrapper from "../components/plan/PlanFormWrapper";
import PlanTableWrapper from "../components/plan/PlanTableWrapper";

export default function ParcelContainer(){
    const { tab = "table" } = useParams();
    const [ value, setValue ] = useState(null);
    const navigate = useNavigate();
    return (
        <ContainerLayout>
           {tab === "table" && (
             <PlanTableWrapper selectRow={(value: any)=>{
              setValue(value)
              navigate('/app/plan/form')
             }} 
             create={()=>{
              setValue(null)
              navigate(`/app/plan/${"form"}`)
             }}/>
           )}
           {tab === "form" && (
             <PlanFormWrapper selectValue={value} back={()=>navigate(`/app/plan/${'table'}`)}/>
           )}
        </ContainerLayout>
    )
}