export class Period {

    constructor(

       public year: number,
       public numero: number,
       public initialDate: Date,
       public endDate: Date,
       public company_id: string,
       public periodStatus_id: string,
       public description: string,
       public month: number,
       public createdAt?: Date,
       public createUser?: string,
       public updatedAt?: Date,
       public updateUser?: string,
       public isActive?: boolean,
        public id?: string,
    ){}
}

