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
    readonly isMulti?: boolean;
    readonly values?: any;
}

export default function SelectPicker({onChange, defaultValue, label, name, components, isBorder = true, isBgColor = true, isMulti = false, values, ...selectProps}:SelectPickerProps){
    const [field, meta] = useField(name);
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

    console.log(meta)


    return (
        <div className='w-100 select-container'>
           {label && (
             <label htmlFor="">{label}</label>
           )}
            <Select
                {...selectProps}
                {...field}
                name={name}
                menuPlacement='auto'
                defaultValue={defaultValue}
                isSearchable={true}
                components={{}}
                onChange={onChange}
                isMulti={isMulti}
                value={values}
                styles={{
                    control: () => ({
                        display: "flex",
                        border: border,
                        borderRadius: '4px',
                        backgroundColor: bgColor,
                    }),
                }}
                className={`w-100 ${(showError)? 'show-error':''} h-100`}
        />
         {(showError) && (
                <span className="w-100 text-danger req-title">{meta.error}</span>
            )}
        </div>
    )
}
