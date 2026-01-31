import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SpaceStatus } from '@prisma/client';

export class CreateSpaceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsEnum(SpaceStatus)
    @IsOptional()
    status?: SpaceStatus;

    @IsOptional()
    level?: number;
}
