import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
    private readonly uploadDir = 'uploads/profile-images';

    constructor() {
        // Ensure upload directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
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
            // Dynamic import for ESM module
            const sharp = (await import('sharp')).default;

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
}
