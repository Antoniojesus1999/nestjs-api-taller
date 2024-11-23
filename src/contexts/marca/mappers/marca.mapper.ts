import { MarcaDto } from "../dtos/marca.dto";
import { ModeloDto } from "../dtos/modelo.dto";
import { Marca } from "../schemas/marca.schema";
import { Modelo } from "../schemas/modelo.schema";

export const MarcaMapper = {
  toDto(marca: Marca): MarcaDto {
    const modelosDto =
      marca.modelos?.map(modelo => this.modeloToDto(modelo)) || [];

    return new MarcaDto(
      marca._id as string,
      marca.nombre,
      marca.slug,
      modelosDto as [ModeloDto],
      marca.createdAt,
      marca.updatedAt,
    );
  },

  toEntity(marcaDto: MarcaDto): Marca {
    const modelos =
      marcaDto.modelos?.map(modeloDto => this.dtoToModelo(modeloDto)) || [];

    const marca = new Marca(
      marcaDto.nombre,
      marcaDto.slug,
      modelos as [Modelo],
      marcaDto.createdAt,
      marcaDto.updatedAt,
    );

    if (marcaDto.id) {
      marca._id = marcaDto.id;
    }

    return marca;
  },

  modeloToDto(modelo: Modelo): ModeloDto {
    return new ModeloDto(modelo.nombre, modelo.slug);
  },

  dtoToModelo(modeloDto: ModeloDto): Modelo {
    return new Modelo(modeloDto.nombre, modeloDto.slug);
  },
};
