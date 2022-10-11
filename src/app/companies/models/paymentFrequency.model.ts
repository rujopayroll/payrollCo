export class PaymentFrequency {

    constructor(
        public id: string,
        public code: string,
        public description: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
    ){}
}