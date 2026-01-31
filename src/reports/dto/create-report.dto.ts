import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
