import prisma from "../models/prismaClient.js";
import { logActivity } from "./activityService.js";

export async function createCustomerService(data) {
  return prisma.customer.create({ data });
}

export async function getCustomerService(id) {
  return prisma.customer.findUnique({ where: { id } });
}

export async function updateCustomerService(id, data) {
  const updated = await prisma.customer.update({
    where: { id },
    data,
  });

  await logActivity({
    type: "customer_update",
    entityId: id,
    description: `Updated customer: ${updated.name}`,
  });

  return updated;
}

export async function deleteCustomerService(id) {
  const deleted = await prisma.customer.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await logActivity({
    type: "customer_delete",
    entityId: id,
    description: `Soft deleted customer: ${deleted.name}`,
  });
}

export async function searchCustomersService(query) {
  return prisma.customer.findMany({
    where: {
      deletedAt: null,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { company: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
}
