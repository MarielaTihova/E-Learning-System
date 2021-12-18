import { UserDTO } from "src/dtos/users/user.dto";
import { User } from "src/models/user.entity";

export class TransformService {
    toUserDTO(user: User): UserDTO {
        return {
            id: user.id,
            username: user.username,
            personalName: user.personalName,
            isDeleted: user.isDeleted,
            registerDate: user.registerDate
        }
    }
}
