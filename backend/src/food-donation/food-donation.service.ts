import { Injectable } from '@nestjs/common';
import { UpdateFoodDonationDto } from './dto/update-food-donation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, FoodDonation as FD2 } from 'generated/prisma';
import { FoodDonation } from './entities/food-donation.entity';
@Injectable()
export class FoodDonationService {
  constructor(private prisma: PrismaService) {}

  create(createFoodDonationDto: Prisma.FoodDonationCreateInput) {
    return this.prisma.foodDonation.create({
      data: createFoodDonationDto,
    });
  }

  async findAll(): Promise<FoodDonation[]> {
    const res = await this.prisma.foodDonation.findMany({
      include: {
        booking: true,
      },
    });
    return res.map((fd) => {
      const foodDonation: FoodDonation = {
        ...fd,
        createdAt: fd.createdAt.toISOString(),
        updatedAt: fd.updatedAt?.toISOString() ?? undefined,
        availableFrom: fd.availableFrom.toISOString(),
        availableTo: fd.availableTo.toISOString(),
        additionalNotes: fd.additionalNotes ?? undefined,
        booking: fd.booking
          ? {
              id: fd.booking.id,
              createdAt: fd.booking.createdAt,
              associationId: fd.booking.associationId,
              foodDonationId: fd.booking.foodDonationId,
            }
          : undefined,
      };
      return foodDonation;
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
