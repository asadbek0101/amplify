import React from "react";
import TableButton from "../button/TableButton";
import EditIcon from "../icons/EditIcon";
import Table from "../table/Table";
import { DateFormatter } from "../../utils/DateFormatter";

interface BranchTableProps{
    readonly data: any;
    readonly selectRow: (value: any) => void;
    readonly selectRowCheckbox: (value: any) => void;
}

export default function ParcelTable({data, selectRow, selectRowCheckbox}:BranchTableProps){
    const headers:any = [
        {
            header: 'Номер',
            access: 'code',
            width: 200
        },
        {
            header: 'Получатель',
            access: 'recepient',
            width: 200
        },
        {
            header: 'Вес',
            access: 'parcelSize',
            width: 200,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.parcelSize.weight}
                            </>
                        )
            },
        },
        {
            header: 'Место',
            access: 'plan',
            width: 200,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.parcelSize.numberOfPoint}
                            </>
                        )
            },
        },
        {
            header: 'Итого',
            access: 'summa',
            width: 200,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.parcelCost.costPickingUp + row.parcelCost.costDeliveryToPoint + row.parcelCost.costDeliveryToBranch}
                            </>
                        )
            },
        },
        {
            header: 'Статус',
            access: 'status',
            width: 200,
            ceil: (row: any) => {
                return row.parcelStatus.map((item:any, index: number)=>{
                    return <div className="text-success fw-bold rounded ps-2 py-1 mb-1">
                    {item.name}
                    </div>
                 })
             }
        },
        {
            header: 'Дата',
            access: 'date',
            width: 200,
            ceil: (row: any)=>{
                console.log(row.dateCreated)
                return (
                            <>
                            {DateFormatter(row.dateCreated)}
                            </>
                        )
            },
        },
        // {
        //     header: 'Phone',
        //     access: 'phone',
        //     width: 200
        // },
        // {
        //     header: 'Code',
        //     access: 'code',
        //     width: 200
        // },
        {
            header: "Edit",
            access: 'edit',
            ceil: (row: any)=>{
                return (
                            <div className="d-flex">
                            <TableButton
                                className="bg-warning"
                                onClick={()=>selectRow(row)}
                                >
                                <EditIcon color="white" size={14}/>
                            </TableButton>
                            </div>
                        )
            },
            width: 100,
        },
        
    ]
    return (<Table selectRowCheckbox={selectRowCheckbox} data={data} headers={headers} withCheckbox={true}/>)
}