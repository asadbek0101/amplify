import React, { Children, ReactElement } from "react";
import { SideBarItemProps } from "./SideBarItem";
import "./assets/app-menu.scss";
import { useSelector } from "react-redux";

interface AppMenuProps{
    readonly onChangeTab: (value: string) => void;
    readonly activeTab: string;
    readonly children: ReactElement<SideBarItemProps>[] | ReactElement<SideBarItemProps>;
    readonly className?: string;
}

export default function AppMenu({onChangeTab, activeTab, children, className}:AppMenuProps){

    const menu = useSelector((state: any)=>state.data.menuStatus)

    return (
        <div className={`menu-item-list-container app-menu w-100 h-100 ${className}`} style={{ backgroundColor: '#2e5c87'}}>
            <div className="name-title d-flex justify-content-center align-items-center py-3">
                {menu != "Opened" && (
                    <span className="name-title-span fs-4 fw-bold text-light">Super Admin</span>
                )}
            </div>
        {Children.map(children, (child)=>{
            return (
                <div className="item-container w-100">
                <div className={`w-100 item-header py-2 px-4 ${activeTab == child.key? 'active-item' : '' } `} onClick={()=>onChangeTab(child.key as string)}>
                <div className="item-title w-100">
                        { child.props.icon && (
                        <span className="pe-3">{child.props.icon}</span>
                        )} 
                        {menu != "Opened" && (
                            <span className={`${menu == "Opened"? "opasity" :""}`}>{child.props.children}</span>
                        )}                            
                        </div>  
                        { child.props.responsiveContent && (
                        <span>
                            bor
                        </span>
                        )}
                        </div>
                     { child.props.responsiveContent && activeTab == child.key && (
                        <div className="responsive-content-box ps-4">
                        <div className={`responsive-content`}>
                            {child.props.responsiveContent}
                     </div>
                     </div>
                     )}
            </div>
            )
        })}
</div>
    )
}