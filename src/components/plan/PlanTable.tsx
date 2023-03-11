import React from "react";
import TableButton from "../button/TableButton";
import EditIcon from "../icons/EditIcon";
import Table from "../table/Table";

interface BranchTableProps{
    readonly data: any;
    readonly selectRow: (value: any) => void;
    readonly selectRowCheckbox: (value: any) => void;
}

export default function PlanTable({data, selectRow, selectRowCheckbox}:BranchTableProps){
    const headers:any = [
        {
            header: 'Name',
            access: 'name',
            width: 200
        },
        {
            header: 'Cost',
            access: 'cost',
            width: 200
        },
        {
            header: 'Description',
            access: 'description',
            width: 200
        },
        // {
        //     header: 'Email',
        //     access: 'email',
        //     width: 200
        // },
        // {
        //     header: 'City',
        //     access: 'city',
        //     width: 200
        // },
        // {
        //     header: 'Address',
        //     access: 'address',
        //     width: 200
        // },
        // {
        //     header: 'Country',
        //     access: 'country',
        //     width: 200
        // },
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