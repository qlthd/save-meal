import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  create(createBookingDto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: createBookingDto,
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: { active: true },
    });
  }

  async findOne(id: number): Promise<Booking | null> {
    const res = await this.prisma.booking.findUnique({
      where: { id, active: true },
      include: {
        foodDonation: true,
      },
    });
    if (!res) return null;
    const booking: Booking = {
      ...res,
      foodDonation: {
        ...res.foodDonation,
        pickupPlace: res.foodDonation.pickupPlace ?? null,
        createdAt: res.foodDonation.createdAt.toISOString(),
        updatedAt: res.foodDonation.updatedAt?.toISOString() ?? undefined,
        availableFrom: res.foodDonation.availableFrom.toISOString(),
        availableTo: res.foodDonation.availableTo.toISOString(),
        additionalNotes: res.foodDonation.additionalNotes ?? undefined,
      },
      isOver: res.foodDonation.availableTo < new Date(),
    };
    return booking;
  }

  async findByAssociation(id: number): Promise<Booking[] | null> {
    const res = await this.prisma.booking.findMany({
      where: { associationId: id, active: true },
      include: {
        foodDonation: true,
      },
    });

    return res.map((b) => {
      const booking: Booking = {
        ...b,
        foodDonation: {
          ...b.foodDonation,
          pickupPlace: b.foodDonation.pickupPlace ?? null,
          createdAt: b.foodDonation.createdAt.toISOString(),
          updatedAt: b.foodDonation.updatedAt?.toISOString() ?? undefined,
          availableFrom: b.foodDonation.availableFrom.toISOString(),
          availableTo: b.foodDonation.availableTo.toISOString(),
          additionalNotes: b.foodDonation.additionalNotes ?? undefined,
        },
        isOver: b.foodDonation.availableTo < new Date(),
      };
      return booking;
    });
  }

  async findByFoodDonation(foodDonationId: number): Promise<Booking | null> {
    const result = await this.prisma.booking.findUnique({
      where: { foodDonationId: foodDonationId, active: true },
      include: {
        foodDonation: true,
      },
    });
    if (!result) return null;
    return {
      ...result,
      foodDonation: {
        ...result.foodDonation,
        pickupPlace: result.foodDonation.pickupPlace ?? null,
        createdAt: result.foodDonation.createdAt.toISOString(),
        updatedAt: result.foodDonation.updatedAt?.toISOString() ?? undefined,
        availableFrom: result.foodDonation.availableFrom.toISOString(),
        availableTo: result.foodDonation.availableTo.toISOString(),
        additionalNotes: result.foodDonation.additionalNotes ?? undefined,
      },
      isOver: result.foodDonation.availableTo < new Date(),
    };
  }

  cancelBooking(id: number): Promise<Booking> {
    return this.prisma.booking.update({
      where: { id },
      data: { active: false },
    });
  }
}
