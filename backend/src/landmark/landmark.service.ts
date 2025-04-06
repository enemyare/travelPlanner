import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateLandmarkDto } from "./dto/create-landmark.dto";
import { UpdateLandmarkDto } from "./dto/update-landmark.dto";

@Injectable()
export class LandmarkService {
  private readonly logger = new Logger(LandmarkService.name)
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const landmark = await this.prisma.landmark.findUnique({
      where: { id },
    })
    if (!landmark) throw new NotFoundException("Достопримечательность не найдена")
    return landmark
  }

  async create(createLandmarkDto: CreateLandmarkDto) {
    const landmark = {
      ...createLandmarkDto,
      mapsLink: `https://maps.google.com/?q=${createLandmarkDto.coordinates}`,
      status: 'В планах',
    }
    return this.prisma.landmark.create({
      data: landmark
    })
  }

  async findAll() {
    return this.prisma.landmark.findMany({
        orderBy: { id: 'asc' }
      }
    )
  }

  async findOne(id: number) {
    const landmark = await this.getById(id)
    return landmark
  }

  async updateViewed(id: number) {
    await this.prisma.landmark.update({
      where: { id },
      data: {
        status: 'Осмотрена'
      },
    })
    return this.findAll()
  }

  async update(id: number, updateLandmark: UpdateLandmarkDto) {
    await this.prisma.landmark.update({
      where: { id },
      data: updateLandmark,
    })
    return this.findAll()
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.landmark.delete({
      where: { id },
    })
    return this.findAll()
  }
}