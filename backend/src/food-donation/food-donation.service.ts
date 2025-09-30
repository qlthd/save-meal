import { Injectable } from '@nestjs/common';
import { UpdateFoodDonationDto } from './dto/update-food-donation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma';
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
        pickupPlace: fd.pickupPlace ?? null,
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
              isOver: fd.availableFrom < new Date(),
            }
          : undefined,
      };
      return foodDonation;
    });
  }

  updateStatus(id: number, status: string) {
    return this.prisma.foodDonation.update({
      where: { id },
      data: { status },
    });
  }

  async findOne(id: number): Promise<FoodDonation | null> {
    const res = await this.prisma.foodDonation.findUnique({
      where: { id },
      include: {
        booking: true,
      },
    });
    if (!res) {
      return null;
    }

    return {
      ...res,
      pickupPlace: res.pickupPlace ?? null,
      createdAt: res.createdAt.toISOString(),
      updatedAt: res.updatedAt?.toISOString() ?? undefined,
      availableFrom: res.availableFrom.toISOString(),
      availableTo: res.availableTo.toISOString(),
      additionalNotes: res.additionalNotes ?? undefined,
      booking: res.booking
        ? {
            id: res.booking.id,
            createdAt: res.booking.createdAt,
            associationId: res.booking.associationId,
            foodDonationId: res.booking.foodDonationId,
            isOver: res.availableFrom < new Date(),
          }
        : undefined,
    };
  }

  update(id: number, updateFoodDonationDto: UpdateFoodDonationDto) {
    return `This action updates a #${id} foodDonation`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodDonation`;
  }
}
