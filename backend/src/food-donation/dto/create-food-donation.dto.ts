import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDonationDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  foodType: string;

  @ApiProperty()
  estimatedPortions: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  pickupPlace: string;

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

  @ApiProperty({ required: false, nullable: true })
  additionalNotes?: string;

  @ApiProperty({ required: false, nullable: true })
  createdAt?: string;

  @ApiProperty({ required: false, nullable: true })
  updatedAt?: string;
}
