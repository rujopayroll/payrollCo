export class Bank {

    constructor(
        public id: string,
        public code: string,
        public name: string,
        public identification: string,
        public address: string,
        public phone: string,
        public idCity: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
    ){}
}