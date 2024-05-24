import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '@/providers/jwt/jwt.config';
import { DataSource } from 'typeorm';
import { UserEntity } from '@/models/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly _dataSource: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload) {
    const id = payload.id;
    return await this._dataSource.manager
      .getRepository(UserEntity)
      .createQueryBuilder()
      .where({ id })
      .getOne();
  }
}
