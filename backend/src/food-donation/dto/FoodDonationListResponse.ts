import { FoodDonation } from '../entities/food-donation.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FoodDonationListResponse {
  @ApiProperty()
  past: FoodDonation[];

  @ApiProperty()
  upcoming: FoodDonation[];
}
