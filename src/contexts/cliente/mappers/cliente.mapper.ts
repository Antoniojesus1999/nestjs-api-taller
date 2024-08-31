import { ClienteDto } from "../dtos/cliente.dto";
import { Cliente } from "../schemas/cliente.schema";

export class ClienteMapper {
  static toDto(cliente: Cliente): ClienteDto {

    return new ClienteDto(
      cliente._id,
      cliente.nif,
      cliente.nombre,
      cliente.apellido_1,
      cliente.apellido_2,
      cliente.telefono,
      cliente.email,
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
