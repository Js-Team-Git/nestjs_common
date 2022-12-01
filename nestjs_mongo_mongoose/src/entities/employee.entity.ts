import { IsString } from "class-validator";

export class Employee{
    @IsString()
    Firstname: string;

    @IsString()
    Surname: string;

    @IsString()
    Designation: string;

    @IsString()
    Email: string;

    @IsString()
    Address: string;

    @IsString()
    Salary: string
}