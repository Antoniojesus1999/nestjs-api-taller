import { ReparacionMapper } from "@src/contexts/reparacion/mappers/reparacion.mapper";
import { ClienteDto } from "../dtos/cliente.dto";
import { Cliente } from "../schemas/cliente.schema";
import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";

export class ClienteMapper {
  static toDto(cliente: Cliente): ClienteDto {

    const reparacionesDto = cliente.reparaciones?.map(reparacion => ReparacionMapper.toDto(reparacion)) || [];

    return new ClienteDto(
      cliente._id,
      cliente.nif,
      cliente.nombre,
      cliente.apellido_1,
      cliente.apellido_2,
      cliente.telefono,
      cliente.email,
      reparacionesDto as [ReparacionDto],
      cliente.createdAt,
      cliente.updatedAt
    );
  }

  static toEntity(clienteDto: ClienteDto): Cliente {

    const cliente = new Cliente(
        clienteDto.nif,
        clienteDto.nombre,
        clienteDto.apellido_1,
        clienteDto.apellido_2,
        clienteDto.telefono,
        clienteDto.email,
        clienteDto.createdAt,
        clienteDto.updatedAt,
      );
  
      if (clienteDto.id) {
        cliente._id = clienteDto.id;
      }
  
      return cliente;
  }

}
