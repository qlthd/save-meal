import { ApiProperty } from '@nestjs/swagger';

export class CreateAssociationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
