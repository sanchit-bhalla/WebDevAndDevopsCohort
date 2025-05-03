import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

interface GlobalPrisma {
  prisma?: ReturnType<typeof prismaClientSingleton>;
}
declare const globalThis: GlobalPrisma;

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
