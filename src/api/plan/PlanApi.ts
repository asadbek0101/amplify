import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllRole } from "./PlanDto";

export class PlanApi extends ApiContext{
    
    public getAllPlan({pageNumber, pageSize}:GetAllRole):Promise<any>{
        return this.get(`/Plan/WithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    public getPlanById({id}:IdProps):Promise<any>{
        return this.get(`/Plan/${id}`)
    }

    public deletePlan({del}:any):Promise<any>{
        return this.post(`/Plan/DeletePlans`, del)
    }

    public updatePlan(body:any){
        return this.put("/Plan", body)
    }

   public createPlan(body: any){
        return this.post("/Plan", body)
   }
}