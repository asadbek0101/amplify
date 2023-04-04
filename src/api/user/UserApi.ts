import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllRole } from "./UserDto";

export class UserApi extends ApiContext{
    
    public getAllUsers({pageNumber, pageSize, roleId }:any):Promise<any>{
        return this.get(`/UserManager/WithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}&RoleId=${roleId}`)
    }

    public getUserById({id}:IdProps):Promise<any>{
        return this.get(`/UserManager/${id}`)
    }

    public deleteUser(id: any):Promise<any>{
        return this.delete(`/UserManager/${id}`)
    }

    public updateUser(body:any){
        return this.put("/UserManager", body)
    }

   public createUser(body: any){
        return this.post("/UserManager", body)
   }
}