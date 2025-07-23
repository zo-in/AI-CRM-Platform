import prisma from "../models/prismaClient.js";

export async function logActivity({ type, entityId, description }) {
  return prisma.activity.create({
    data: { type, entityId, description },
  });
}
export async function getActivityFeed() {
  return prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}
