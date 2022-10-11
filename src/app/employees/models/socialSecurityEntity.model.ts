export class SocialSecurityEntity {
    constructor(
public id: string,
public code: string,
public name: string,
public socialSecurityEntityType_id: string,
public identification?: string,
public verificationNumber?: string,
public createUser?: string,
public updateUser?: string,
public isActive?: boolean,
public city_id?: string,
public address?: string,
public phone?: string,


    ){}
}