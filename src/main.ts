import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configure, getLogger } from 'log4js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

const configService = app.get(ConfigService);

	configure(configService.getOrThrow<string>('LOG4JS_CONFIG'));
	const logger = getLogger('counterone.main');

	const pjson = require(configService.get<string>('NODE_ENV') ? '../package.json' : './package.json');

	try {
		app.useLogger(logger);

		logger.info(`Appspot base middleware v ${pjson.version} starting...`);

		app.enableCors();

		const config = new DocumentBuilder()
    .setTitle('CounterONE base API')
    .setDescription('Documentation')
    .setVersion('1.0')
    .addTag('root', 'Public APis without authentication')
    .build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api', app, document);

		const port = configService.getOrThrow<number>('SERVER_PORT');

		await app.listen(port);

		logger.info(`Appspot base middleware v ${pjson.version} is running`);
	} catch (err) {
		logger.error(`Appspot base middleware v ${pjson.version} bootstrap failed... ${err} Shutting down`);
		process.exit(1);
	}
};

bootstrap();
