import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateEmergencyDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    location?: string;
}
