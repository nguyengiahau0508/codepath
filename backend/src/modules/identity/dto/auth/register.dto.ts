import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(2)
    countryCode?:string;
}