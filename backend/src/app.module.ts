import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LandmarkModule } from './landmark/landmark.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    LandmarkModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
