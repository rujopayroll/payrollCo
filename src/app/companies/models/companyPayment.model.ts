export class CompanyPayment {
    constructor(
public id?: string,
public createUser?: string,
public updateUser?: string,
public isActive?: boolean,
public accountNumber?: number,
public paymentFrequency_id?: string,
public paymentMethod_id?: string,
public bank_id?: string,
public accountType_id?: string,
public createdAt?: Date,
public updatedAt?: Date,
   ){}
}