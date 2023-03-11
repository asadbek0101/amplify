import React from "react";
import TableButton from "../button/TableButton";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import Table from "../table/Table";

interface UserManagerTableProps{
    readonly data: any;
    readonly editRow: (value: any) => void;
    readonly deleteRow: (value: any) => void;
}

export default function UserManagerTable({data, editRow, deleteRow}:UserManagerTableProps){
    const headers:any = [
        {
            header: 'First Name',
            access: 'firstName',
            width: 100
        },
        // {
        //     header: 'Date',
        //     access: 'dateCreated',
        //     width: 100
        // },
        {
            header: 'Last Name',
            access: 'lastName',
            width: 100
        },
        {
            header: 'Address',
            access: 'address',
            width: 100
        },
        {
            header: 'Phone',
            access: 'phone',
            width: 100
        },
        {
            header: 'User Roles',
            access: 'userRoles',
            width: 80,
            ceil: (row: any) => {
               return row.userRoles.map((item:any, index: number)=>{
                   return <div className="bg-success text-light rounded ps-2 py-1 my-1">
                   - {item.role.name}
                   </div>
                })
            }
        },
        {
            header: "Actions",
            access: 'edit',
            ceil: (row: any)=>{
                return (
                            <div className="d-flex">
                            <TableButton
                                className="bg-warning me-3"
                                onClick={()=>editRow(row)}
                                >
                                <EditIcon color="white" size={14}/>
                            </TableButton>
                            <TableButton
                                className="bg-danger"
                                onClick={()=>deleteRow(row)}
                                >
                                <DeleteIcon color="white" size={14}/>
                            </TableButton>
                            </div>
                        )
            },
            width: 60,
        },
        
    ]
    return (<Table data={data} headers={headers} withCheckbox={false}/>)
}