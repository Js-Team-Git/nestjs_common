import { IsString } from "class-validator"

export class CreateUserDto {
    @IsString({})
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    gender: string
    
    @IsString()
    mobile: string
}
