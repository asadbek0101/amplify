import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BranchIcon from "../icons/BranchIcon";
import PlanIcon from "../icons/PlanIcon";
import RoleIcon from "../icons/RoleIcon";
import TestIcon from "../icons/TestIcon";
import UserIcon from "../icons/UserIcon";
import UsersIcon from "../icons/UsersIcon";
import AppMenu from "./AppMenu";
import SideBarItem from "./SideBarItem";
import { SaveActiveItem } from "../../utils/SaveActiveItem";
import { useSelector } from "react-redux";
import "./assets/app-menu.scss";
import AddIcon from "../icons/AddIcon";
import BoxsIcon from "../icons/BoxsIcon";

export default function SideBarMenu(){
    const location = useLocation();
    const tab = useMemo(()=>SaveActiveItem("tab", location.pathname),[SaveActiveItem, location.pathname])
    const navigate = useNavigate();
    const menu = useSelector((state: any)=>state.data.menuStatus)
    const profile = useSelector((state: any) =>state.data.profile)

    return (
        <AppMenu
            activeTab={tab}
            onChangeTab={(value: string)=>{
                navigate(`/app/${value}`)
            }}
            >
            <SideBarItem
                key="account"
                icon={
                    <UserIcon color="white"/>  
                }
                responsiveContent={
                    <AppMenu
                        activeTab="app"
                        onChangeTab={(value: any)=>console.log(value)}
                        >
                    <SideBarItem
                        key="role-manager"
                        >
                        Role Manager
                    </SideBarItem>    
                    <SideBarItem
                        key="plan"
                        >
                        Plan
                    </SideBarItem> 
                    <SideBarItem
                        key="status"
                        >
                        Status
                    </SideBarItem> 
                    <SideBarItem
                        key="branch"
                        >
                        Branches
                    </SideBarItem>    
                    </AppMenu>
                }
                >
                Administrator
            </SideBarItem>
            <SideBarItem
                key="status"
                icon={
                    <UserIcon color="white"/>  
                }
                responsiveContent={
                    <AppMenu
                        activeTab="users"
                        onChangeTab={(value: any)=>console.log(value)}
                        >
                    <SideBarItem
                        key="role-manager"
                        >
                        Role Manager
                    </SideBarItem>    
                    <SideBarItem
                        key="plan"
                        >
                        Plan
                    </SideBarItem> 
                    <SideBarItem
                        key="status"
                        >
                        Status
                    </SideBarItem> 
                    <SideBarItem
                        key="branch"
                        >
                        Branches
                    </SideBarItem>    
                    </AppMenu>
                }
                >
                Users
            </SideBarItem>
            <SideBarItem
                key="parcel"
                icon={
                    <BoxsIcon color="white"/>
                }
                responsiveContent={
                    <AppMenu
                        activeTab="users"
                        onChangeTab={(value: any)=>console.log(value)}
                        >
                    <SideBarItem
                        key="role-manager"
                        >
                        All Parcels
                    </SideBarItem>     
                    </AppMenu>
                }
                >
                Parcels
            </SideBarItem>
            <SideBarItem
                key="add-parcel"
                icon={
                    <AddIcon color="white"/>
                }
                >
                Add Parcel
            </SideBarItem>
        </AppMenu>
    )
}