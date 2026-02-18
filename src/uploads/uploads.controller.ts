import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { memoryStorage } from 'multer';

@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) { }

    @Post('profile-image')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(), // Keep in memory for sharp processing
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB limits
        },
    }))
    async uploadProfileImage(@UploadedFile() file: Express.Multer.File) {
        const url = await this.uploadsService.processAndSaveProfileImage(file);
        return { url };
    }

    @Post('logo')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
    }))
    async uploadLogo(@UploadedFile() file: Express.Multer.File) {
        const url = await this.uploadsService.processAndSaveLogo(file);
        return { url };
    }

    @Post('visit-attachment')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB for visit photos
        },
    }))
    async uploadVisitAttachment(@UploadedFile() file: Express.Multer.File) {
        const url = await this.uploadsService.processAndSaveVisitImage(file);
        return { url };
    }
}
