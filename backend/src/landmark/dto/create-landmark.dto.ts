import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateLandmarkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  coordinates: string;
}