import React , { ReactNode } from "react"
import { useSelector } from "react-redux";
import "./assets/sidebar.scss";

interface SideBarMenuLayoutProps{
    readonly children: ReactNode;
}

export default function SideBarMenuLayout({children}:SideBarMenuLayoutProps){
    
    const menu = useSelector((state: any)=>state.data.menuStatus)
    
    const profile = useSelector((state: any) =>state.data.profile)

    return (
        <div className="h-100 sidebar-menu">
            <div className="name-title d-flex justify-content-center align-items-center py-3">
                {menu != "Opened" && (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <span className="name-title-span fs-5 fw-bold text-light">{profile.unique_name}</span>
                        <span className="text-light title-sub">{profile.sub}</span>
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}