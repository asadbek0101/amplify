import React, {useState, useCallback, useEffect} from "react";

interface TestCheckboxProps{
    readonly data: any[];
    readonly selectIds?: (value: any[]) => void;
}

export default function TestCheckbox({data, selectIds}:TestCheckboxProps){

    const [arr, setArr] = useState<any[]>([]);
    const [dataTable, setDataTable] = useState<any[]>([]);
    useEffect(()=>{
        setDataTable(data)
    },[setDataTable])

    const handleChange = useCallback((value: any)=>{
        const { name, checked } = value.target;
        if(name === "allSelect"){
            let ar = dataTable.map((item: any)=>{
                return {...item, isChecked: checked}
            });
            setDataTable(ar);
            setIds(ar);
        }else{
            let ar = dataTable.map((item: any, index: any)=> index.toString() === name? {...item, isChecked: checked} : item);
            setDataTable(ar);
            setIds(ar);
        }
    },[setDataTable, dataTable])


    const setIds = useCallback((value: any)=>{
        let arr = value.map((item: any)=>{
            if(item.isChecked){
                return item.id
            }
        });
        let arrr = arr.filter((item: any)=>item)
        selectIds && selectIds(arrr)
    },[selectIds])

    return (
        <div className="w-100 h-100 p-3">
            <div className="bg-light my-2 d-flex align-items-center p-2">
                <input type="checkbox" name="allSelect" onChange={handleChange}/>
                <div>
                    All
                </div>
            </div>
            {dataTable.map((item: any, index: number)=>{
                return (
                    <div key={index} className="bg-light my-2 d-flex align-items-center p-2">
                        <div className="d-flex justify-content-center align-items-center">
                            <input type="checkbox" name={index.toString()} onChange={handleChange} checked={item.isChecked || false}/>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                        {item.name}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}