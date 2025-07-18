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
    return this.prisma.booking.findMany();
  }

  async findByAssociation(id: number): Promise<Booking[] | null> {
    const res = await this.prisma.booking.findMany({
      where: { associationId: id },
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
      };
      return booking;
    });
  }
}
