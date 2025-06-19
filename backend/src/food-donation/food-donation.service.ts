import { Injectable } from '@nestjs/common';
import { UpdateFoodDonationDto } from './dto/update-food-donation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class FoodDonationService {
  constructor(private prisma: PrismaService) {}

  create(createFoodDonationDto: Prisma.FoodDonationCreateInput) {
    return this.prisma.foodDonation.create({
      data: createFoodDonationDto,
    });
  }

  async findAll() {
    return this.prisma.foodDonation.findMany({
      include: {
        booking: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} foodDonation`;
  }

  update(id: number, updateFoodDonationDto: UpdateFoodDonationDto) {
    return `This action updates a #${id} foodDonation`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodDonation`;
  }
}
