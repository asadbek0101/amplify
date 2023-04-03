import { useParams } from "react-router-dom";
import BranchTab from "../components/administrator/BranchTab";
import PlanTab from "../components/administrator/PlanTab";
import RoleManagerTab from "../components/administrator/RoleManagerTab";
import StatusTab from "../components/administrator/StatusTab";
import ContainerLayout from "../components/app/ContainerLayout";

export default function AdministratorContainer(){
  
    const { tab = "role-manager" } = useParams();

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