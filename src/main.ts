import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express' 
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './api/app.module';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
                   .setTitle('Books Demo')
                   .setDescription('Books Demo description')
                   .setVersion('1.0')
                   .addBearerAuth()
                   .build()

   const document = SwaggerModule.createDocument(app, options);
   SwaggerModule.setup('api/v1/docs', app, document);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
                   
  await app.listen(3000, '0.0.0.0');
})();

