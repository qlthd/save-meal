import { ApiProperty } from '@nestjs/swagger';

export class Booking {
  @ApiProperty()
  id: number;

  @ApiProperty()
  associationId: number;

  @ApiProperty()
  foodDonationId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ nullable: true })
  association?: Booking;
}
