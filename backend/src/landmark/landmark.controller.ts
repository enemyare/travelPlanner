import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { LandmarkService } from './landmark.service';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from "./dto/update-landmark.dto";

@Controller('/landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  @Post()
  create(@Body() createLandmark: CreateLandmarkDto) {
    return this.landmarkService.create(createLandmark)
  }

  @Get()
  findAll() {
    return this.landmarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landmarkService.findOne(Number(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateLandmark: UpdateLandmarkDto) {
    return this.landmarkService.update(Number(id), updateLandmark);
  }

  @Get('/:id/updateViewed')
  updateViewed(@Param('id') id: number) {
    return this.landmarkService.updateViewed(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landmarkService.remove(Number(id));
  }
}
