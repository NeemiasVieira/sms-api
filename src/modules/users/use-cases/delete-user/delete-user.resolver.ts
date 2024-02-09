// import { Args, Mutation, Resolver } from "@nestjs/graphql";
// import { DeleteUserDto } from "./delete-user.dto";
// import Users from "src/database/mongodb/schemas/user.schema";
// import { HttpException } from "@nestjs/common";

// @Resolver()
// export class DeleteUserResolver{

//     @Mutation(() => String)
//     async deleteUser(@Args() deleteUserDto : DeleteUserDto) : Promise<string>{

//         const { id } = deleteUserDto;

//         const user = await Users.findById(id);

//         if(!user) throw new HttpException("Usuário não existe", 400);

//         await Users.deleteOne({_id: id});

//         return `Usuário ${user.name} excluído com sucesso!`;

//     }

// }