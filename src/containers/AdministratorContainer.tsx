import React, { useState, useEffect, useMemo} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BranchTab from "../components/administrator/BranchTab";
import PlanTab from "../components/administrator/PlanTab";
import RoleManagerTab from "../components/administrator/RoleManagerTab";
import StatusTab from "../components/administrator/StatusTab";
import ContainerLayout from "../components/app/ContainerLayout";
import RoleManagerTable from "../components/role/RoleManagerTable";
import StatusFormWrapper from "../components/status/StatusFormWrapper";
import StatusTableWrapper from "../components/status/StatusTableWrapper";

export default function AdministratorContainer(){
    const { tab = "role-manager" } = useParams();
    const [ value, setValue ] = useState(null);
    const [formType, setFormType] = useState("");
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();

    console.log(tab)

    return (
        <ContainerLayout>
              {tab === "role-manager" && (
                <RoleManagerTab/>
              )}   
               {tab === "plan" && (
                <PlanTab/>
              )} 
               {tab === "status" && (
                <StatusTab/>
              )} 
               {tab === "branch" && (
                <BranchTab/>
              )}           
        </ContainerLayout>
    )
}