import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";
import { ReparacionMapper } from "@src/contexts/reparacion/mappers/reparacion.mapper";

import { ClienteDto } from "../dtos/cliente.dto";
import { PuntoDto } from "../dtos/punto.dto";
import { Cliente } from "../schemas/cliente.schema";
import { Punto } from "../schemas/punto.schema";

export const ClienteMapper = {
  toDto(cliente: Cliente): ClienteDto {
    const reparacionesDto =
      cliente.reparaciones?.map(reparacion =>
        ReparacionMapper.toDto(reparacion),
      ) || [];

    const firma = cliente.firma?.map(punto => this.puntoToDto(punto)) || [];

    return new ClienteDto(
      cliente._id as string,
      cliente.nif,
      cliente.nombre,
      cliente.apellido1,
      cliente.apellido2,
      cliente.telefono,
      cliente.email,
      firma as [PuntoDto],
      cliente.firmaBase64,
      reparacionesDto as [ReparacionDto],
      cliente.createdAt,
      cliente.updatedAt,
    );
  },

  toEntity(clienteDto: ClienteDto): Cliente {
    const firma =
      clienteDto.firma?.map(puntoDto => this.dtoToPunto(puntoDto)) || [];

    const cliente = new Cliente(
      clienteDto.nif,
      clienteDto.nombre,
      clienteDto.apellido1,
      clienteDto.apellido2,
      clienteDto.telefono,
      clienteDto.email,
      firma,
      clienteDto.firmaBase64,
      clienteDto.createdAt,
      clienteDto.updatedAt,
    );

    if (clienteDto.id) {
      cliente._id = clienteDto.id;
    }

    return cliente;
  },

  puntoToDto(punto: Punto): PuntoDto {
    return new PuntoDto(punto.dx, punto.dy, punto.pressure, punto.type);
  },

  dtoToPunto(puntoDto: PuntoDto): Punto {
    return new Punto(
      puntoDto.dx,
      puntoDto.dy,
      puntoDto.pressure,
      puntoDto.type,
    );
  },
};
