import { IsNotEmpty, MaxLength } from "class-validator";

export class CreatePdfDto {
  @IsNotEmpty({ message: "El campo no puede estar vacío" })
  nombreTaller: string;

  cpTaller: string;

  munYProvinTaller: string;

  nifTaller: string;

  @MaxLength(9, { message: "El campo no puede tener más de 9 caracteres" })
  //Restriccion de 9 caracteres
  riiaTaller: string;

  tlfTaller: string;

  @MaxLength(9, { message: "El campo no puede tener más de 9 caracteres" })
  numResgDepoTaller: string;

  @MaxLength(7, { message: "El campo no puede tener más de 7 caracteres" })
  matriculaVeh: string;

  marcaModeloVeh: string;

  combustibleVeh: string;

  seguroVeh: string;

  polizaVeh: string;

  kmsVeh: string;

  chasisVeh: string;

  ape1Cliente_2: string;

  fecEntradaVeh: string;

  fecSalidaVeh: string;

  nomCliente: string;

  ape1Cliente: string;

  @MaxLength(9, { message: "El campo no puede tener más de 9 caracteres" })
  nifCliente: string;

  emailCliente: string;

  //Restricción de 9 si llaman con +234 que le den porculo
  @MaxLength(9, { message: "El campo no puede tener más de 9 caracteres" })
  tlfCliente: string;

  tareasRealizadas: string;

  constructor(
    nombreTaller: string,
    cpTaller: string,
    munYProvinTaller: string,
    nifTaller: string,
    riiaTaller: string,
    tlfTaller: string,
    numResgDepoTaller: string,
    matriculaVeh: string,
    marcaModeloVeh: string,
    combustibleVeh: string,
    seguroVeh: string,
    polizaVeh: string,
    kmsVeh: string,
    chasisVeh: string,
    ape1Cliente_2: string,
    fecEntradaVeh: string,
    fecSalidaVeh: string,
    nomCliente: string,
    ape1Cliente: string,
    nifCliente: string,
    emailCliente: string,
    tlfCliente: string,
    tareasRealizadas: string,
  ) {
    this.nombreTaller = nombreTaller;
    this.cpTaller = cpTaller;
    this.munYProvinTaller = munYProvinTaller;
    this.nifTaller = nifTaller;
    this.riiaTaller = riiaTaller;
    this.tlfTaller = tlfTaller;
    this.numResgDepoTaller = numResgDepoTaller;
    this.matriculaVeh = matriculaVeh;
    this.marcaModeloVeh = marcaModeloVeh;
    this.combustibleVeh = combustibleVeh;
    this.seguroVeh = seguroVeh;
    this.polizaVeh = polizaVeh;
    this.kmsVeh = kmsVeh;
    this.chasisVeh = chasisVeh;
    this.ape1Cliente_2 = ape1Cliente_2;
    this.fecEntradaVeh = fecEntradaVeh;
    this.fecSalidaVeh = fecSalidaVeh;
    this.nomCliente = nomCliente;
    this.ape1Cliente = ape1Cliente;
    this.nifCliente = nifCliente;
    this.emailCliente = emailCliente;
    this.tlfCliente = tlfCliente;
    this.tareasRealizadas = tareasRealizadas;
  }
}
