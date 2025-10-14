import bcrypt from "bcrypt";
import UserDTO from "../domain/dto/UserDTO.js";
import { UserRepository } from "../domain/repositories/UserRepository.js";

export class UserService {
    constructor(userRepository = new UserRepository()) {
        this.userRepository = userRepository;
    }

    // Register new user
    async registerUser(data) {
        // Check if the email already exists
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already registered");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.userRepository.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: hashedPassword,
        });

        return UserDTO.fromEntity(user);
    }
}
