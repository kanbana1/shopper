// src/coupons/coupons.module.ts
import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';

// PostgresModule es @Global(), POSTGRES_POOL ya está disponible.
@Module({
  controllers: [CouponsController],
})
export class CouponsModule {}
