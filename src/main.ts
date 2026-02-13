import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup';

async function bootstrap() {
  console.log('Environment Check:', {
    masterDb: !!process.env.MASTER_DATABASE_URL,
    paypalId: !!process.env.PAYPAL_CLIENT_ID,
    emailUser: process.env.EMAIL_USER
  });
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Server is running');
}
bootstrap();
