import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadsService {
    private uploadDir = 'uploads/profile-images';
    private logoDir = 'uploads/logos';

    constructor() {
        // Use /tmp for Vercel environment (Ephemeral storage)
        if (process.env.VERCEL) {
            this.uploadDir = '/tmp/uploads/profile-images';
            this.logoDir = '/tmp/uploads/logos';
        }

        try {
            // Ensure upload directories exist
            if (!fs.existsSync(this.uploadDir)) {
                fs.mkdirSync(this.uploadDir, { recursive: true });
            }
            if (!fs.existsSync(this.logoDir)) {
                fs.mkdirSync(this.logoDir, { recursive: true });
            }
        } catch (error) {
            console.warn(`Failed to create upload directories. Fallback to /tmp.`);
            this.uploadDir = '/tmp/uploads/profile-images';
            this.logoDir = '/tmp/uploads/logos';
            if (!fs.existsSync(this.uploadDir)) {
                fs.mkdirSync(this.uploadDir, { recursive: true });
            }
            if (!fs.existsSync(this.logoDir)) {
                fs.mkdirSync(this.logoDir, { recursive: true });
            }
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

        const filename = `${randomUUID()}.jpg`;
        const filepath = path.join(this.uploadDir, filename);

        try {
            try {
                await sharp(file.buffer)
                    .resize(500, 500, { // Resize to standard profile dimension
                        fit: 'cover',
                        position: 'center'
                    })
                    .jpeg({ quality: 90 }) // Convert to JPEG with high quality
                    .toFile(filepath);
            } catch (sharpError) {
                console.warn('Sharp processing failed, falling back to raw save:', sharpError);
                // Fallback: save raw buffer if sharp fails (e.g., in some serverless environments)
                fs.writeFileSync(filepath, file.buffer);
            }

            // Return relative URL that will be served by ServeStaticModule
            return `/uploads/profile-images/${filename}`;
        } catch (error) {
            console.error('Image upload error:', error);
            throw new BadRequestException('Failed to upload image');
        }
    }

    async processAndSaveLogo(file: Express.Multer.File): Promise<string> {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg\+xml)$/)) {
            throw new BadRequestException('Only image files are allowed!');
        }

        const filename = `${randomUUID()}.png`;
        const filepath = path.join(this.logoDir, filename);

        try {
            try {
                await sharp(file.buffer)
                    .resize(400, 200, {
                        fit: 'inside',
                        withoutEnlargement: true,
                    })
                    .png({ quality: 95 })
                    .toFile(filepath);
            } catch (sharpError) {
                console.warn('Sharp logo processing failed, falling back to raw save:', sharpError);
                fs.writeFileSync(filepath, file.buffer);
            }

            return `/uploads/logos/${filename}`;
        } catch (error) {
            console.error('Logo upload error:', error);
            throw new BadRequestException('Failed to upload logo image');
        }
    }
}
