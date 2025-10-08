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
        public salaryBase?: boolean,
        public securityBase?: boolean,
        public riskBase?: boolean,
        public parafiscalBase?: boolean,
        public retentionBase?: boolean,
        public isCalculated?: boolean,
        public transportBase?: boolean,
        public isNovelty?: boolean,
        public isOverTime?: boolean,
        public absenteeType_id?: string,
        public primaLegalBase?: boolean,
        public isCustomer?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public id?:  string,
    ){}
}
