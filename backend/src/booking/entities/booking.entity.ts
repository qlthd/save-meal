import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { FoodDonation } from '../../food-donation/entities/food-donation.entity';

export class Booking {
  @ApiProperty()
  id: number;

  @ApiProperty()
  associationId: number;

  @ApiProperty()
  foodDonationId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: () => User, nullable: true })
  association?: User;

  @ApiProperty({ type: () => FoodDonation, nullable: true })
  foodDonation?: FoodDonation;
}
