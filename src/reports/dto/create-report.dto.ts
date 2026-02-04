import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    location?: string;
}
