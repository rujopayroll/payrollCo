export class Usuario {

    constructor(
        public name: string,
        public userName: string,
        public password: string,
        public cellPhone?: string,
        public rol_id?: string,
        public isActive?: boolean,
        public img?: string,
        public id?: string,
        
    ){}
}