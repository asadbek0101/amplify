import React, { useCallback, useEffect, useState } from "react";
import "./assets/test.scss";

interface Props{
    readonly placeholder?: string;
    readonly options: any[];
    readonly onChage: (value: any) => void;
    readonly handleScroll?: (event: any) => void;
    readonly name?: string;
    readonly label?: string;
}

export default function SelectVirtualizedPricek({placeholder = "Select...", label, onChage, options, handleScroll, name}:Props){
    const [isOptions, setIsOptions] = useState("closed");
    const [optionList, setOptionList] = useState<any[]>([])
    const [value, setValue] = useState<any>("");
    const [active, setActive] = useState<any>("");

    window.onclick = function(event: any) {
        console.log(event.target.matches("#select-input"))
           if(!event.target.matches("#select-input")){
                setIsOptions("closed")
           }
    }

    useEffect(()=>{
        const filteredData : any = options?.filter((el: any) => {
            if (value === '') {
                return el;
            }
            else {
                return el.label.toLowerCase().includes(value.toLowerCase())
            }
        })
        setOptionList(filteredData);
    },[setOptionList, value])

    

    const onChangeOption = useCallback((value: any)=>{
        setIsOptions("closed");
        onChage(value);
        setValue(value.label);
        setActive(value.value);
    },[setIsOptions, onChage, setActive, setValue]);

    
    return (
       <div>
        <div>
            {label}
        </div>
         <div className="select-container">
            <div id="select" className="select" onClick={()=>setIsOptions(isOptions == "opened"? "closed":"opened")}>
                <input id="select-input" type="text" placeholder={placeholder} value={value} onChange={(event)=>setValue(event.target.value)}/>
            </div>
           {options && isOptions == "opened" && (
             <div className="options" onScroll={handleScroll}>
                {options?.map((item: any, index: number)=>{
                    return <div className={`option ${active == item.value? "active-back" : "" }`} key={index} onClick={()=>onChangeOption(item)}>{item.label}</div>
                })}
            </div>
           )}
        </div>
       </div>
    )
}