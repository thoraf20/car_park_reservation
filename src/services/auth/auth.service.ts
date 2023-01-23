import { generateAccessToken } from "@/helper";
import { User } from "../../entity/user";
import { RegisterUserDto } from "./auth.dto";


export class AuthService {
  static async register(data: RegisterUserDto) {
    
    const newUser = new User()
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.firstName = data.firstName as string;
    newUser.lastName = data.lastName as string;

    newUser.save()

    return newUser;
  }
}