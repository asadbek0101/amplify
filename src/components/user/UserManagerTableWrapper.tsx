import React , {useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import Modal from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import YesOrNoModal from "../app/YesOrNoModal";
import UserManagerTable from "./UserManagerTable";

interface UserManagerTableWrapperProps{
    readonly create: () => void;
    readonly editRow: (value: any) => void;
    readonly roleId: number;
}

export default function UserManagerTableWrapper({create, editRow, roleId}:UserManagerTableWrapperProps){

    const [data, setData] = useState<any>({});
    const [id, setId] = useState(null)
    const [isDelModal, setIsDelModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = searchParams.get("pageSize") || 25;
    const pageCount = searchParams.get("pageCount") || 1;

  useEffect(()=>{
      request.get(`/UserManager/WithPagination?pageNumber=${Number(pageCount)}&pageSize=${Number(pageSize)}&RoleId=${roleId}`,{
        headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
      }).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
      
  },[request, toast, pageCount, pageSize, roleId])

  const deleteRow = useCallback((id: any)=>{
        request.delete(`/UserManager/${id}`, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }).then((response: any)=>{
            toast.success("Deleted!");
            setIsDelModal(false);
            window.location.reload();
        }).catch((error: any)=>{
            toast.error("Faild!")
        })
        setId(null);
  },[ setIsDelModal, setId])

    return (
        <TabPage
            childrenClassName="p-2"
            footerComponent={
                <div className="d-flex justify-content-end my-3">
                <Pagination 
                    pageNumber={data.pageNumber} 
                    totalCount={data.totalCount} 
                    totalPages={data.totalPages} 
                    onSubmit={(value: any)=>console.log(value)}/>
                </div>
            }
            >
            <UserManagerTable 
                 editRow={editRow}
                 deleteRow={(row: any)=>{
                    setId(row.id)
                    setIsDelModal(true)
                 }}
                 data={data.items}/>
            <Modal
                width="400px"
                show={isDelModal}
                closeHandler={()=>setIsDelModal(false)}
                className="d-flex justify-content-center align-items-center"
                >
                    <YesOrNoModal 
                        titleText="Are you sure to delete?"
                        onClick={(value: boolean)=>{
                        if(value){
                            deleteRow(id);
                        }else{
                            setIsDelModal(false);
                        }
                        setId(null);
                    }}/>
            </Modal>
        </TabPage>
    )
}