import { PartialType } from "@nestjs/mapped-types";

import { CreateDanoVehiculoImageDto } from "./create-dano-vehiculo-image.dto";

export class UpdateDanoVehiculoImageDto extends PartialType(
  CreateDanoVehiculoImageDto,
) {}
