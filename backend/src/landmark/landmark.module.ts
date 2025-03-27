import { Module } from '@nestjs/common';
import { LandmarkService } from './landmark.service';
import { LandmarkController } from './landmark.controller';
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [LandmarkController],
  providers: [LandmarkService, PrismaService],
})
export class LandmarkModule {}
