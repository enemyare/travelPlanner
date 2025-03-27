import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { LandmarkService } from './landmark.service';
import { CreateLandmarkDto } from './dto/create-landmark.dto';

@Controller('/landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  @Post()
  create(@Body() createLandmarkDto: CreateLandmarkDto) {
    return this.landmarkService.create(createLandmarkDto);
  }

  @Get()
  findAll() {
    return this.landmarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landmarkService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.landmarkService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landmarkService.remove(Number(id));
  }
}
