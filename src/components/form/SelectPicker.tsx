import { useField } from 'formik';
import React, { CSSProperties, useMemo, useState, ReactNode } from 'react';
import Select from 'react-select';
import "./assets/form.scss";
  
interface SelectPickerProps{
    readonly onChange?: (value: any) => void;
    readonly options?: any[];
    readonly defaultValue?: any;
    readonly label?: string;
    readonly name: string;
    readonly components?: ReactNode;
}

export default function SelectPicker({onChange, options, defaultValue, label, name, components}:SelectPickerProps){
    const [field, meta] = useField(name);
    const [req, setReq] = useState<boolean>(false)
    const showError = useMemo(()=>Boolean(meta.error && meta.touched), [meta])

    return (
        <div className=''>
           {label && (
             <label className='mb-1' htmlFor="">{label}</label>
           )}
            <Select
                name={name}
                menuPlacement='auto'
                // className='w-50'
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
                isSearchable={true}
                components={{}}
                styles={{
                    control: () => ({
                        display: "flex",
                        border: '1px solid #c6ccd8',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                    }),
                }}
                className={`w-100 ${(showError || req)? 'show-error':''}`}
        />
         {(showError || req) && (
                <span className="w-100 text-danger req-title">Required</span>
            )}
        </div>
    )
}
