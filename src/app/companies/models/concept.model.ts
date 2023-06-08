export class Concept {

    constructor(

        public code: string,
        public description: string,
        public company_id: string,
        public account: string,
        public counterPart: string,
        public conceptGroup?: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
        public salaryBase?: string,
        public securityBase?: string,
        public riskBase?: string,
        public parafiscalBase?: string,
        public retentionBase?: string,
        public isCalculated?: boolean,
        public transportBase?: string,
        public isNovelty?: boolean,
        public isOverTime?: boolean,
        public absenteeType_id?: string,
        public primaLegalBase?: string,
        public isCustomer?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public id?:  string,
    ){}
}
