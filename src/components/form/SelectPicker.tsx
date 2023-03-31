import { useField } from 'formik';
import React, { CSSProperties, useMemo, useState, ReactNode, useEffect } from 'react';
import Select from 'react-select';
import "./assets/form.scss";
  
interface SelectPickerProps{
    readonly onChange?: (value: any) => void;
    readonly options?: any[];
    readonly defaultValue?: any;
    readonly label?: string;
    readonly name: string;
    readonly components?: ReactNode;
    readonly isBorder?: boolean;
    readonly isBgColor?: boolean;
}

export default function SelectPicker({onChange, options, defaultValue, label, name, components, isBorder = true, isBgColor = true}:SelectPickerProps){
    const [field, meta] = useField(name);
    const [req, setReq] = useState<boolean>(false)
    const [border, setBorder] = useState<string>("1px solid #c6ccd8");
    const [bgColor, setBgColor] = useState<string>("#fff");
    const showError = useMemo(()=>Boolean(meta.error && meta.touched), [meta])

    useEffect(()=>{
        if(!isBorder){
            setBorder("")
        }
    },[setBorder, isBorder])

    useEffect(()=>{
        if(!isBgColor){
            setBgColor("")
        }
    },[setBgColor, isBgColor])


    return (
        <div className='w-100 select-container'>
           {label && (
             <label htmlFor="">{label}</label>
           )}
            <Select
                name={name}
                menuPlacement='auto'
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
                isSearchable={true}
                components={{}}
                styles={{
                    control: () => ({
                        display: "flex",
                        border: border,
                        borderRadius: '4px',
                        backgroundColor: bgColor,
                    }),
                }}
                className={`w-100 ${(showError || req)? 'show-error':''} h-100`}
        />
         {(showError || req) && (
                <span className="w-100 text-danger req-title">Required</span>
            )}
        </div>
    )
}
