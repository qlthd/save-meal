import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  corporateName: string;

  @ApiProperty({ required: false })
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
