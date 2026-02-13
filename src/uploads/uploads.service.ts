import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

@Injectable()
export class UploadsService {
    private readonly uploadDir = 'uploads/profile-images';
    private readonly logoDir = 'uploads/logos';

    constructor() {
        // Ensure upload directories exist
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
        if (!fs.existsSync(this.logoDir)) {
            fs.mkdirSync(this.logoDir, { recursive: true });
        }
    }

    async processAndSaveProfileImage(file: Express.Multer.File): Promise<string> {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        // Validate image type
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
            throw new BadRequestException('Only image files are allowed!');
        }

        const { v4: uuidv4 } = await import('uuid');
        const filename = `${uuidv4()}.jpg`;
        const filepath = path.join(this.uploadDir, filename);

        try {
            await sharp(file.buffer)
                .resize(500, 500, { // Resize to standard profile dimension
                    fit: 'cover',
                    position: 'center'
                })
                .jpeg({ quality: 90 }) // Convert to JPEG with high quality
                .toFile(filepath);

            // Return relative URL that will be served by ServeStaticModule
            return `/uploads/profile-images/${filename}`;
        } catch (error) {
            console.error('Image processing error:', error);
            throw new BadRequestException('Failed to process image');
        }
    }

    async processAndSaveLogo(file: Express.Multer.File): Promise<string> {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg\+xml)$/)) {
            throw new BadRequestException('Only image files are allowed!');
        }

        const { v4: uuidv4 } = await import('uuid');
        const filename = `${uuidv4()}.png`;
        const filepath = path.join(this.logoDir, filename);

        try {
            await sharp(file.buffer)
                .resize(400, 200, {
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                .png({ quality: 95 })
                .toFile(filepath);

            return `/uploads/logos/${filename}`;
        } catch (error) {
            console.error('Logo processing error:', error);
            throw new BadRequestException('Failed to process logo image');
        }
    }
}
