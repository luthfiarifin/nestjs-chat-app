import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerConfig {

    static config(app) {
        const config = new DocumentBuilder()
            .setTitle('NestJS Chat App API')
            .setDescription('NestJS Chat App API')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup('docs', app, document);
    }
}