import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateVisitDto {
    @IsUUID()
    hostId: string;

    @IsString()
    @IsNotEmpty()
    visitorName: string;

    @IsString()
    @IsOptional()
    visitorIdNumber?: string;

    @IsString()
    @IsOptional()
    licensePlate?: string;

    @IsDateString()
    validFrom: string;

    @IsDateString()
    validUntil: string;

    @IsNumber()
    @IsOptional()
    companionCount?: number;

    @IsString()
    @IsOptional()
    images?: string;

    @IsUUID()
    @IsOptional()
    spaceId?: string;
}
