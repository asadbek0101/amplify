import React , {useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";
import DeleteIcon from "../icons/DeleteIcon";
import TabPage from "../tabs/TabPage";
import Modal from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import YesOrNoModal from "../app/YesOrNoModal";
import PlanTable from "./PlanTable";

interface BranchTableWrapperProps{
    readonly create: () => void;
    readonly selectRow: (value: any) => void;
}

export default function PlanTableWrapper({create, selectRow}:BranchTableWrapperProps){

    const [data, setData] = useState<any>({})
    const [ids, setIds] = useState([])
    const [isDelModal, setIsDelModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = searchParams.get("pageSize") || 25;
    const pageCount = searchParams.get("pageCount") || 1;

  useEffect(()=>{
      request.get(`/Plan/WithPagination?pageNumber=${Number(pageCount)}&pageSize=${Number(pageSize)}`,{
        headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
      }).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
      
  },[request, toast, pageCount, pageSize])

  const deletePost = useCallback(()=>{
        const del = {
            id: ids
        }
        request.post('/Plan/DeletePlans', del, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }).then((response: any)=>{
            toast.success("Deleted!");
            setIsDelModal(false);
            window.location.reload();
        }).catch((error: any)=>{
            toast.error("Faild!")
        })
  },[ids, setIsDelModal])

    return (
        <TabPage
            childrenClassName="p-2"
            headerComponent={
                <Button onClick={()=>create()} className="mb-2 text-light px-2 py-1 bg-gold">
                    Create
                </Button>
            }
            footerComponent={
                <div className="d-flex justify-content-between my-3">
                <Button className="bg-danger px-2 py-2" onClick={()=>{
                    if(ids.length === 0){
                        toast.error("Please choose branch")
                    }else{
                        setIsDelModal(true)}}
                    }
                    >
                    <DeleteIcon color="white" size={16}/>
                </Button>
                <Pagination 
                    pageNumber={data.pageNumber} 
                    totalCount={data.totalCount} 
                    totalPages={data.totalPages} 
                    onSubmit={(value: any)=>console.log(value)}/>
                </div>
            }
            >
            <PlanTable 
                 selectRowCheckbox={setIds} 
                 selectRow={selectRow} 
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
                            deletePost();
                        }else{
                            setIsDelModal(false);
                        }
                    }}/>
            </Modal>
        </TabPage>
    )
}