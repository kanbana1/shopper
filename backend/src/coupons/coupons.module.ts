<<<<<<< HEAD
// src/coupons/coupons.module.ts
import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';

// PostgresModule es @Global(), POSTGRES_POOL ya está disponible.
@Module({
  controllers: [CouponsController],
=======
import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';

@Module({
  controllers: [CouponsController],
  providers:   [CouponsService],
>>>>>>> 18b765f5aa403ac0380dccca6892c5c99a22a0b6
})
export class CouponsModule {}
