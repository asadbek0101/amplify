import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllParcel, GetAllRole } from "./ParcelDto";

export class ParcelApi extends ApiContext{
    
    public getAllParcel({pageNumber, pageSize, code}:GetAllParcel):Promise<any>{
        return this.get(`/Parcel/GetParcelListWithPaginationByCode?pageNumber=${pageNumber}&pageSize=${pageSize}&Code=${code}`)
    }

    public getParcelById({id}:IdProps):Promise<any>{
        return this.get(`/Parcel/${id}`)
    }

    public deleteParcel(del:any):Promise<any>{
        return this.post(`/Parcel/DeleteParcels`, del)
    }

    public updateParcel(body:any){
        return this.put("/Parcel", body)
    }

   public createParcel(body: any){
        return this.post("/Parcel", body)
   }
}