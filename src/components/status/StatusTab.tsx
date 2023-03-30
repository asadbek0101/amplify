import React, { useState, useEffect, useMemo} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import StatusFormWrapper from "./StatusFormWrapper";
import StatusTableWrapper from "./StatusTableWrapper";

export default function StatusTab(){
    const [ value, setValue ] = useState(null); 
    const [formType, setFormType] = useState("");
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();

    const tab = useMemo(()=>search.get("formType")? search.get("formType") : 'table',[search])
    // useEffect(()=>{
    //   setSearch({formType: "table"})
    // },[setSearch])

    console.log(tab)

    return (
        <ContainerLayout>
           {tab === "table" && (
             <StatusTableWrapper selectRow={(value: any)=>{
              setValue(value)
              // navigate('/app/status/form');
              setSearch({formType: "form"})
             }} 
             create={()=>{
              setValue(null)
              // navigate(`/app/status/${"form"}`);
              setSearch({formType: "form"})
             }}/>
           )}
           {tab === "form" && (
             <StatusFormWrapper selectValue={value} back={()=>navigate(`/app/status/${'table'}`)}/>
           )}
        </ContainerLayout>
    )
}