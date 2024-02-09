// import { Args, Mutation, Resolver } from "@nestjs/graphql";
// import { User } from "src/modules/users/user.type";
// import { UpdateUserDto } from "./update-user.dto";
// import Users from "src/database/mongodb/schemas/user.schema";

// @Resolver()
// export class UpdateUserResolver{

//     @Mutation(() => User)
//     async updateUser(@Args() usuarioModificado: UpdateUserDto) : Promise<User>{
        
//         const user = await Users.findById(usuarioModificado.id);

//         Object.keys(usuarioModificado).forEach((key) => {
//             user[key] = usuarioModificado[key]
//         })

//         await user.save();

//         return user;

//     }

// }