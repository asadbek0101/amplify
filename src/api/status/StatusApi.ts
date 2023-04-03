import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllRole } from "./StatusDto";

export class StatusApi extends ApiContext{
    
    public getAllStatus({pageNumber, pageSize}:GetAllRole):Promise<any>{
        return this.get(`/Status/WithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    public getStatusById({id}:IdProps):Promise<any>{
        return this.get(`/Status/${id}`)
    }

    public deleteStatus(body: any):Promise<any>{
        return this.post(`/Status/DeleteStatuses`, body)
    }

    public updateStatus(body:any){
        return this.put("/Status", body)
    }

   public createStatus(body: any){
        return this.post("/Status", body)
   }
}