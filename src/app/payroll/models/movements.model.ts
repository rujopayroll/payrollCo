export class Movements {

    constructor(

       public employee_id: string,
       public period_id: string,
       public concept_id: string,
       public company_id: string,
       public year: number,
       public month: number,
       public quantity?: number,
       public value?: number,
       public createdAt?: Date,
       public createUser?: string,
       public updatedAt?: Date,
       public updateUser?: string,
       public isActive?: boolean,
        public id?: string,
    ){}
}
