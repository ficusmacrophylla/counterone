import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule, Routes } from '@nestjs/core';
import { FileServiceModule } from './services/file-service.module';
import { ConfigModule } from '@nestjs/config';


const routes: Routes = [
	{ path: 'provide', module: FileServiceModule },
];

@Module({
  imports: [	
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register(routes),
    FileServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
