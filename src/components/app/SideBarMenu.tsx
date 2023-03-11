import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BranchIcon from "../icons/BranchIcon";
import LessonsIcon from "../icons/LessonsIcon";
import PlanIcon from "../icons/PlanIcon";
import RoleIcon from "../icons/RoleIcon";
import TestIcon from "../icons/TestIcon";
import UserIcon from "../icons/UserIcon";
import UsersIcon from "../icons/UsersIcon";
import AppMenu from "./AppMenu";
import SideBarItem from "./SideBarItem";

export default function SideBarMenu(){
    const [tab, setTab] = useState("branch")
    const navigate = useNavigate();

    return (
        <AppMenu
            activeTab={tab}
            onChangeTab={(value: string)=>{
                navigate(`/app/${value}`)
                setTab(value);
            }}
            >
            <SideBarItem
                key="account"
                icon={
                    <UserIcon color="white"/>  
                }
                >
                Account
            </SideBarItem>
            <SideBarItem
                key="status"
                icon={
                    <TestIcon color="white"/>
                }
                >
                Status
            </SideBarItem>
            <SideBarItem
                key="branch"
                icon={
                    <BranchIcon color="white"/>
                }
                >
                Branch
            </SideBarItem>
            <SideBarItem
                key="plan"
                icon={
                    <PlanIcon color="white"/>
                }
                >
                Plan
            </SideBarItem>
            <SideBarItem
                key="role-manager"
                icon={
                    <RoleIcon color="white"/>
                }
                >
                Role Manager
            </SideBarItem>
            <SideBarItem
                key="user-manager"
                icon={
                    <UsersIcon color="white"/>
                }
                >
                User Manager
            </SideBarItem>
        </AppMenu>
    )
}