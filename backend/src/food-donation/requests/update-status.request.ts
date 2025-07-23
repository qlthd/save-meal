import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusRequest {
  @ApiProperty({
    description: 'Nouveau statut de la collecte',
    example: 'collected',
    required: true,
  })
  status: string;
}
