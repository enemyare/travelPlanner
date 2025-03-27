import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UpdateStatusDto } from "./dto/update-statusLandmark.dto";
import { CreateLandmarkDto } from "./dto/create-landmark.dto";

@Injectable()
export class LandmarkService {
  constructor(private prisma: PrismaService) {}

   async getById(id: number) {
    const landmark = await this.prisma.landmark.findUnique({
      where: { id },
    })
    if (!landmark) throw new NotFoundException("Достопримечательность не найдена");
    return landmark
  }

  async create(createLandmarkDto: CreateLandmarkDto) {
    const landmark = {
      ...createLandmarkDto,
      mapsLink: `https://maps.google.com/?q=${createLandmarkDto.coordinates}`,
      status: 'В планах',
      createAt: new Date().toISOString()
    }
    return this.prisma.landmark.create({
      data: landmark
    })
  }

  async findAll() {
    return this.prisma.landmark.findMany()
  }

  async findOne(id: number) {
    const landmark = await this.getById(id)
    return landmark
  }

  async update(id: number) {
    return this.prisma.landmark.update({
      where: { id },
      data: {
        status: 'Осмотрена'
      },
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    await this.findOne(id)
    return this.prisma.landmark.update({
      where: { id },
      data: {
        status: updateStatusDto.status,
        ...(updateStatusDto.status === 'Осмотрена' && {
          viewedAt: new Date().toISOString(),
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.landmark.delete({
      where: { id },
    });
  }


}