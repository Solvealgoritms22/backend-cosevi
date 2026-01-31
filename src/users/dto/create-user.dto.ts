import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, IsOptional, IsArray, IsUUID } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(Role)
    role?: Role;

    @IsOptional()
    isActive?: boolean;

    @IsString()
    @IsOptional()
    idNumber?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    dateOfBirth?: string; // Passed as ISO string

    @IsString()
    @IsOptional()
    unitNumber?: string;

    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    assignedSpaceIds?: string[];

    @IsString()
    @IsOptional()
    profileImage?: string;

    @IsOptional()
    pushNotificationsEnabled?: boolean;

    @IsString()
    @IsOptional()
    pushToken?: string;
}
