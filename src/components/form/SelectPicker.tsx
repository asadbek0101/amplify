import React, { CSSProperties } from 'react';
import Select from 'react-select';
  
interface SelectPickerProps{
    readonly onChange: (value: any) => void;
    readonly options?: any[];
    readonly defaultValue?: any;
}

export default function SelectPicker({onChange, options, defaultValue}:SelectPickerProps){
    return (
        <div className='w-100'>
            <Select
                menuPlacement='auto'
                // className='w-50'
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
                isSearchable={true}
                // isMulti={true}
                styles={{
                    control: () => ({
                        width: "100%",
                        display: "flex",
                        border: '1px solid black',
                        borderRadius: '4px'
                        }),
                }}
        />
        </div>
    )
}
