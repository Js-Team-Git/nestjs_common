import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EmployeeDocument = Employee & Document

@Schema()
export class Employee{
    @Prop()
    Firstname: string

    @Prop()
    Surname: string

    @Prop()
    Email: string

    @Prop()
    Designation: string

    @Prop()
    Address: string

    @Prop()
    Salary: string
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)