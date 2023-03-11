import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "../components/app/AppLayout";
import BranchContainer from "./BranchContainer";
import StatusContainer from "./StatusContainer";

export default function AppContainer(){
    return (
        <AppLayout>
           <Outlet/>
        </AppLayout>
        )
}