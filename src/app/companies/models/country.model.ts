export class Country {

    constructor(
        public id: string,
        public code: string,
        public name: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
    ){}
}