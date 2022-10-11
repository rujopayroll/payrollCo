export class City {

    constructor(
        public id: string,
        public code: string,
        public name: string,
        public idState: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
    ){}
}