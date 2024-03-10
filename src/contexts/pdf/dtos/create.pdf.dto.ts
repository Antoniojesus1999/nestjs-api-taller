import { IsNotEmpty, MaxLength } from "class-validator";

export class CreatePdfDto {
    @IsNotEmpty({ message: 'El campo no puede estar vacío' })
    nombreTaller: String;

    cpTaller: String;
    
    munYProvinTaller: String;

    nifTaller: String;

    @MaxLength(9, { message: 'El campo no puede tener más de 9 caracteres' })
    //Restriccion de 9 caracteres
    riiaTaller: String;

    tlfTaller: String;

    @MaxLength(9, { message: 'El campo no puede tener más de 9 caracteres' })
    numResgDepoTaller: String;

    @MaxLength(7, { message: 'El campo no puede tener más de 7 caracteres' })
    matriculaVeh: String;

    marcaModeloVeh: String;

    combustibleVeh: String;

    seguroVeh: String;

    polizaVeh: String;

    kmsVeh: String;

    chasisVeh: String;

    ape1Cliente_2: String;

    fecEntradaVeh: String;

    fecSalidaVeh: String;

    nomCliente: String;

    ape1Cliente: String;

    @MaxLength(9, { message: 'El campo no puede tener más de 9 caracteres' })
    nifCliente: String;

    emailCliente: String;

    //Restricción de 9 si llaman con +234 que le den porculo
    @MaxLength(9, { message: 'El campo no puede tener más de 9 caracteres' })
    tlfCliente: String;

    tareasRealizadas: String;

}