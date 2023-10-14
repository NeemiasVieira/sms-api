import prisma from "../../../../database/prisma/prismaClient.js"


export const getAllLogsService = async() => {
    await prisma.$connect();

    const logs = await prisma.logs.findMany();

    logs.reverse();

    await prisma.$disconnect();

    return logs;
}