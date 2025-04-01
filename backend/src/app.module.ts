import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LandmarkModule } from './landmark/landmark.module';

@Module({
  imports: [LandmarkModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
