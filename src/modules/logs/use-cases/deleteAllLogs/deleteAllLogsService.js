import prisma from "../../../../database/prisma/prismaClient.js"


export const deleteAllLogsService = async () => {
    await prisma.$connect();

    await prisma.logs.deleteMany();

    await prisma.$disconnect();

    return;
}