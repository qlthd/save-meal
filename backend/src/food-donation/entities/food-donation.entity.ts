import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '../../booking/entities/booking.entity';

export class FoodDonation {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  foodType: string;

  @ApiProperty()
  estimatedPortions: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false, nullable: true })
  pickupPlace: string | null;

  @ApiProperty()
  address: string;

  @ApiProperty()
  pickupInstructions: string;

  @ApiProperty()
  availableFrom: string;

  @ApiProperty()
  availableTo: string;

  @ApiProperty()
  contactName: string;

  @ApiProperty()
  contactPhone: string;

  @ApiProperty()
  contactEmail: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty({ required: false, nullable: true })
  additionalNotes?: string;

  @ApiProperty({ required: false, nullable: true })
  createdAt?: string;

  @ApiProperty({ required: false, nullable: true })
  updatedAt?: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: () => Booking, required: false, nullable: true })
  booking?: Booking;
}
