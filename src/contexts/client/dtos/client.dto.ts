import { Vehicle } from "../schemas/vehicle.schema";
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class ClientDto{
    @IsOptional()
    name:String;
    
    @IsNotEmpty()
    nif:String;

    @IsOptional()
    surName1:String;

    @IsOptional()
    surName2:String;
    
    @IsOptional()
    tlfn: String;

    @IsNotEmpty()
    @IsEmail()
    email:String;

    @IsOptional()
    cars:[Vehicle]
    
}
