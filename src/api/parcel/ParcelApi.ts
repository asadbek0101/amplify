import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllRole } from "./ParcelDto";

export class ParcelApi extends ApiContext{
    
    public getAllParcel({pageNumber, pageSize}:GetAllRole):Promise<any>{
        return this.get(`/Parcel/WithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    public getParcelById({id}:IdProps):Promise<any>{
        return this.get(`/Parcel/${id}`)
    }

    public deleteParcel(del:any):Promise<any>{
        return this.post(`/Parcel/DeleteBranches`, del)
    }

    public updateParcel(body:any){
        return this.put("/Parcel", body)
    }

   public createParcel(body: any){
        return this.post("/Parcel", body)
   }
}