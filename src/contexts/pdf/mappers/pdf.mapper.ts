import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";

import { CreatePdfDto } from "../dtos/create.pdf.dto";

export const PdfMapper = {
  toDto(reparacionDto: ReparacionDto): CreatePdfDto {
    const diaFecEntrada = reparacionDto.fecEntrada
      .getDate()
      .toString()
      .padStart(2, "0");
    const mesFecEntrada = (reparacionDto.fecEntrada.getMonth() + 1)
      .toString()
      .padStart(2, "0"); // +1 porque enero = 0
    const anioFecEntrada = reparacionDto.fecEntrada.getFullYear();

    const fecEntradaFormateada = `${diaFecEntrada}/${mesFecEntrada}/${anioFecEntrada}`;

    const trabajosTexto = reparacionDto.trabajos
      .map(trabajo => trabajo.descripcion)
      .join("\n");

    return new CreatePdfDto(
      reparacionDto.taller.nombre,
      reparacionDto.taller.direccion,
      reparacionDto.taller.cp,
      `${reparacionDto.taller.municipio}, ${reparacionDto.taller.provincia}`,
      reparacionDto.taller.cif,
      reparacionDto.taller.riia,
      reparacionDto.taller.telefono,
      "",
      `${reparacionDto.vehiculo.matricula} - ${reparacionDto.vehiculo.marca} ${reparacionDto.vehiculo.modelo}`,
      reparacionDto.combustible,
      reparacionDto.seguro,
      "",
      reparacionDto.kilometros,
      reparacionDto.chasis,
      reparacionDto.cliente.apellido2,
      fecEntradaFormateada,
      "",
      reparacionDto.cliente.nombre,
      reparacionDto.cliente.apellido1,
      reparacionDto.cliente.nif,
      reparacionDto.cliente.email,
      reparacionDto.cliente.telefono,
      trabajosTexto,
      "",
    );
  },
};
