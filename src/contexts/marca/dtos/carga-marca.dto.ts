import { CargaModeloDto } from "./carga-modelo.dto";

export class CargaMarcaDto {
  id: string;
  name: string;
  slug: string;
  models: [CargaModeloDto];

  constructor(
    id: string,
    name: string,
    slug: string,
    models: [CargaModeloDto],
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.models = models;
  }
}
