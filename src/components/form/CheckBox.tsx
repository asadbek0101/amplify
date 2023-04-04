import React from "react";
import "./assets/checkbox.scss";

interface Props{
    readonly name: string;
    readonly leftLabel?: string;
    readonly rightLabel?: string;
    readonly className?: string;
    readonly checkboxClassName?: string;
    readonly style?:  any;
}

export default function CheckBox({name, leftLabel, rightLabel, className, checkboxClassName, style}:Props){
    return (
        <div className={`${className} checkbox-container`}>
           {leftLabel && (
            <div className="left-label">
                <label htmlFor={name}>{leftLabel}</label>
            </div>
           )}
                <input className={`${checkboxClassName}`} type="checkbox" id={name}/>
           {rightLabel && (
            <div className="right-label">
                 <label htmlFor={name}>{rightLabel}</label>
            </div>
           )}
        </div>
    )
}