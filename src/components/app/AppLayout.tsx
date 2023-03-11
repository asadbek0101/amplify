import React, { ReactNode, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_menu_status } from "../../redux/action";
import Header from "../header/Header";
import "./assets/app-layout.scss";
import SideBarMenu from "./SideBarMenu";

interface AppLayoutProps{
    readonly children: ReactNode;
}

export default function AppLayout({children}:AppLayoutProps){
    const [isMenu, setIsMenu] = useState(false)
    const menu = useSelector((state: any) =>state.data.menuStatus)
    const dispatch = useDispatch();
    return (
        <div className="app-layout">
            <div className={`side-bar-menu ${menu == "Opened"? 'side-bar-menu-close': ''}`}>
                    <SideBarMenu/>
            </div>
            <div className={`page-container ${menu == "Opened"? 'page-container-close':''}`}>
            <div className="header">
             <Header menuButton={()=>dispatch(set_menu_status(menu == "Opened" ? "Closed" : "Opened"))}/>
            </div>
            <div className="page">
                {children}
            </div>
            </div>
        </div>
    )
}