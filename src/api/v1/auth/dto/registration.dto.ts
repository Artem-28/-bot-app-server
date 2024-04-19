import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsDefined()
  // @Matches('password')
  confirmPassword: string;

  @IsString()
  @IsDefined()
  @Length(6, 6)
  code: string;

  @IsBoolean()
  @IsDefined()
  licenseAgreement: boolean;
}
