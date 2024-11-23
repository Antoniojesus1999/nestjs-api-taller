import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";
import { ReparacionMapper } from "@src/contexts/reparacion/mappers/reparacion.mapper";

import { ClienteDto } from "../dtos/cliente.dto";
import { Cliente } from "../schemas/cliente.schema";

export const ClienteMapper = {
  toDto(cliente: Cliente): ClienteDto {
    const reparacionesDto =
      cliente.reparaciones?.map(reparacion =>
        ReparacionMapper.toDto(reparacion),
      ) || [];

    return new ClienteDto(
      cliente._id as string,
      cliente.nif,
      cliente.nombre,
      cliente.apellido1,
      cliente.apellido2,
      cliente.telefono,
      cliente.email,
      reparacionesDto as [ReparacionDto],
      cliente.createdAt,
      cliente.updatedAt,
    );
  },

  toEntity(clienteDto: ClienteDto): Cliente {
    const cliente = new Cliente(
      clienteDto.nif,
      clienteDto.nombre,
      clienteDto.apellido1,
      clienteDto.apellido2,
      clienteDto.telefono,
      clienteDto.email,
      clienteDto.createdAt,
      clienteDto.updatedAt,
    );

    if (clienteDto.id) {
      cliente._id = clienteDto.id;
    }

    return cliente;
  },
};
