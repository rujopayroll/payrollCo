export class WorkPlaceRisks {

    constructor(
        public id: string,
        public code: string,
        public description: string,
        public percentage: number,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
    ){}
}