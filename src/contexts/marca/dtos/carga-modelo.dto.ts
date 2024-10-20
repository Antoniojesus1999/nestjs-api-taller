export class CargaModeloDto {
  idMarca: string;
  id: string;
  name: string;
  slug: string;

  constructor(idMarca: string, id: string, name: string, slug: string) {
    this.idMarca = idMarca;
    this.id = id;
    this.name = name;
    this.slug = slug;
  }
}
