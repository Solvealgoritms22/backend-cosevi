import { Injectable, BadRequestException } from '@nestjs/common';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadsService {
    async processAndSaveProfileImage(file: Express.Multer.File): Promise<string> {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        // Validate image type
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
            throw new BadRequestException('Only image files are allowed!');
        }

        const filename = `profile-images/${randomUUID()}.jpg`;

        try {
            let buffer = file.buffer;
            try {
                buffer = await sharp(file.buffer)
                    .resize(500, 500, {
                        fit: 'cover',
                        position: 'center'
                    })
                    .jpeg({ quality: 90 })
                    .toBuffer();
            } catch (sharpError) {
                console.warn('Sharp processing failed, using raw buffer:', sharpError);
            }

            const { url } = await put(filename, buffer, {
                access: 'public',
                token: process.env.BLOB_READ_WRITE_TOKEN
            });

            return url;
        } catch (error) {
            console.error('Image upload error:', error);
            throw new BadRequestException('Failed to upload image to permanent storage');
        }
    }

    async processAndSaveLogo(file: Express.Multer.File): Promise<string> {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg\+xml)$/)) {
            throw new BadRequestException('Only image files are allowed!');
        }

        const filename = `logos/${randomUUID()}.png`;

        try {
            let buffer = file.buffer;
            try {
                buffer = await sharp(file.buffer)
                    .resize(400, 200, {
                        fit: 'inside',
                        withoutEnlargement: true,
                    })
                    .png({ quality: 95 })
                    .toBuffer();
            } catch (sharpError) {
                console.warn('Sharp logo processing failed, using raw buffer:', sharpError);
            }

            const { url } = await put(filename, buffer, {
                access: 'public',
                token: process.env.BLOB_READ_WRITE_TOKEN
            });

            return url;
        } catch (error) {
            console.error('Logo upload error:', error);
            throw new BadRequestException('Failed to upload logo to permanent storage');
        }
    }

    async processAndSaveVisitImage(file: Express.Multer.File): Promise<string> {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
            throw new BadRequestException('Only image files are allowed!');
        }

        const filename = `visits/${randomUUID()}.jpg`;

        try {
            let buffer = file.buffer;
            try {
                // Resize slightly but keep detail for security/validation
                buffer = await sharp(file.buffer)
                    .resize(1200, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .jpeg({ quality: 85 })
                    .toBuffer();
            } catch (sharpError) {
                console.warn('Sharp visit image processing failed:', sharpError);
            }

            const { url } = await put(filename, buffer, {
                access: 'public',
                token: process.env.BLOB_READ_WRITE_TOKEN
            });

            return url;
        } catch (error) {
            console.error('Visit image upload error:', error);
            throw new BadRequestException('Failed to upload visit image to permanent storage');
        }
    }
}
