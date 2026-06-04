<<<<<<< HEAD
// src/coupons/coupons.controller.ts
import {
  Controller, Post, Body, Inject, UseGuards,
} from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../database/postgres/postgres.provider';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

class ValidateCouponDto {
  @IsString()
  @MinLength(1)
  code: string;
}

/** Todas las rutas de cupones requieren sesión activa. */
@Controller('coupons')
@UseGuards(JwtAuthGuard)
export class CouponsController {
  constructor(
    @Inject(POSTGRES_POOL) private readonly pool: Pool,
  ) {}

  /**
   * POST /coupons/validate
   * Público — no requiere autenticación.
   * Valida si un código existe, está activo, no ha expirado y tiene usos disponibles.
   */
  @Post('validate')
  async validate(@Body() dto: ValidateCouponDto) {
    const code = dto.code.toUpperCase().trim();

    const { rows } = await this.pool.query(
      `SELECT discount_pct, max_uses, times_used, expires_at
       FROM coupons
       WHERE code = $1
         AND is_active = true
         AND (max_uses IS NULL OR times_used < max_uses)
         AND (expires_at IS NULL OR expires_at > NOW())`,
      [code],
    );

    if (!rows[0]) {
      return { valid: false, message: 'Cupón inválido o expirado' };
    }

    return {
      valid:    true,
      code,
      discount: rows[0].discount_pct as number,
    };
=======
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post('validate')
  @UseGuards(JwtAuthGuard)
  validate(@Body('code') code: string) {
    if (!code?.trim()) {
      return { valid: false, message: 'Código requerido' };
    }
    return this.couponsService.validate(code);
>>>>>>> 18b765f5aa403ac0380dccca6892c5c99a22a0b6
  }
}
