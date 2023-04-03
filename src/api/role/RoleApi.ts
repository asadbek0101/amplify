import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllRole } from "./RoleDto";

export class RoleApi extends ApiContext{
    
    public getAllRole({pageNumber, pageSize}:GetAllRole):Promise<any>{
        return this.get(`/RoleManager/WithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    public getRoleById({id}:IdProps):Promise<any>{
        return this.get(`/RoleManager/${id}`)
    }

    public deleteRole({id}:IdProps):Promise<any>{
        return this.delete(`/RoleManager/${id}`)
    }

    public updateRole(body:any){
        return this.put("/RoleManager", body)
    }

   public createRole(body: any){
        return this.post("/RoleManager", body)
   }
}