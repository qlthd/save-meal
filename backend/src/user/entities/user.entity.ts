import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  corporateName: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
}
