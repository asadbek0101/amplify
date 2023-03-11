import React, { CSSProperties } from 'react';
import Select from 'react-select';

import {
    ColourOption,
    colourOptions,
    FlavourOption,
    GroupedOption,
    groupedOptions,
  } from "./data";
  
interface SelectPickerProps{
    readonly onChange: (value: any) => void;
}

export default function SelectPicker({onChange}:SelectPickerProps){
    return (
        <div>
            <Select
                menuPlacement='auto'
                // className='w-50'
                defaultValue={colourOptions[1]}
                options={colourOptions}
                onChange={onChange}
                isSearchable={true}
                styles={{
                    control: () => ({
                        display: "flex",
                        border: '1px solid black',
                        borderRadius: '4px'
                        }),
                }}
        />
        </div>
    )
}
