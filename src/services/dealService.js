import prisma from "../models/prismaClient.js";
import { logActivity } from "./activityService.js";

export async function createDealService(data) {
  const deal = await prisma.deal.create({ data });

  await logActivity({
    type: "deal_create",
    entityId: deal.id,
    description: `Created deal: "${deal.title}" for customer ${deal.customerId}`,
  });

  return deal;
}

export async function getDealService(id) {
  return prisma.deal.findUnique({
    where: { id },
  });
}

export async function updateDealService(id, data) {
  const updated = await prisma.deal.update({
    where: { id },
    data,
  });

  if (data.stage) {
    await logActivity({
      type: "deal_stage_change",
      entityId: id,
      description: `Deal stage changed to "${data.stage}"`,
    });
  }

  return updated;
}

export async function deleteDealService(id) {
  const deleted = await prisma.deal.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await logActivity({
    type: "deal_delete",
    entityId: id,
    description: `Soft deleted deal: "${deleted.title}"`,
  });
}

export async function getDealsForCustomerService(customerId) {
  return prisma.deal.findMany({
    where: {
      customerId,
      deletedAt: null,
    },
    orderBy: { createdAt: "desc" },
  });
}
