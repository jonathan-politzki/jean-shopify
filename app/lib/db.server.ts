import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function createPersonalityLink(userId: string, storeId: string, link: string) {
  return prisma.personalityLink.create({
    data: {
      user_id: userId,
      store_id: storeId,
      link
    }
  });
}