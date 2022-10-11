export class Concept {

    constructor(
       
        public code: string,
        public description: string,
        public company_id: string,
        public account: string,
        public counterPart: string,
        public conceptTypeId: string,
        public conceptGroup: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public salaryBase?: boolean,
        public securityBase?: boolean,
        public riskBase?: boolean,
        public parafiscalBase?: boolean,
        public retentionBase?: boolean,
        public isCalculated?: boolean,
        public id?: string,
    ){}
}