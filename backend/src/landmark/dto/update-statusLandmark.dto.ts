import { IsIn} from "class-validator";

export class UpdateStatusDto  {
  @IsIn(['В планах', 'Осмотрена'])
  status: string;
}