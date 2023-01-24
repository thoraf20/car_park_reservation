import { Garage } from "../../entity/garage";
import { GarageDto } from "./garage.dto";


export class GarageService {
  static async addGarage(data: GarageDto) {
    
    const newGarage = new Garage()
    newGarage.postalCode = data.postalCode;
    newGarage.rateCompact = Number(data.rateCompact);
    newGarage.rateReg = Number(data.rateReg);
    newGarage.rateLarge = Number(data.rateLarge);

    newGarage.save()

    return newGarage;
  }
}