export class State {

    constructor(
        public id: string,
        public code: string,
        public name: string,
        public idCountry: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
    ){}
}