export class Subsidiary {

    constructor(
        public description: string,
        public company_id: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
        public id?: string,
    ){}
}