import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllRole } from "./BranchDto";

export class BranchApi extends ApiContext{
    
    public getAllBranch({pageNumber, pageSize}:GetAllRole):Promise<any>{
        return this.get(`/Branch/WithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    public getBranchById({id}:IdProps):Promise<any>{
        return this.get(`/Branch/${id}`)
    }

    public deleteBranch(del:any):Promise<any>{
        return this.post(`/Branch/DeleteBranches`, del)
    }

    public updateBranch(body:any){
        return this.put("/Branch", body)
    }

   public createBranch(body: any){
        return this.post("/Branch", body)
   }
}