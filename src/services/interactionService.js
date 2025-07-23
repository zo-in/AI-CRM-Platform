import prisma from "../models/prismaClient.js";
import { extractMemoryFromText } from "./aiService.js";
import { resolveMemoryConflicts } from "../utils/memoryUtils.js";

export async function createInteractionService(data) {
  return prisma.interaction.create({ data });
}

export async function summarizeAndMergeMemory(interactionId) {
  const interaction = await prisma.interaction.findUnique({
    where: { id: interactionId },
    include: { customer: true },
  });

  if (!interaction) throw new Error("Interaction not found");

  const aiMemory = await extractMemoryFromText(interaction.notes);
  const now = new Date();

  const incomingMemory = aiMemory.map((m) => ({
    ...m,
    createdAt: now,
  }));

  const existingMemory = await prisma.memory.findMany({
    where: { customerId: interaction.customerId },
  });

  const mergedMemory = resolveMemoryConflicts(existingMemory, incomingMemory);

  await prisma.memory.deleteMany({
    where: { customerId: interaction.customerId },
  });

  await prisma.memory.createMany({
    data: mergedMemory.map((m) => ({
      ...m,
      customerId: interaction.customerId,
      sourceNoteId: interaction.id,
    })),
  });

  return {
    status: "memory_updated",
    memoryCount: mergedMemory.length,
    customerId: interaction.customerId,
  };
}

export async function getMemoryByCustomerId(customerId) {
  return prisma.memory.findMany({
    where: {
      customerId,
      deletedAt: null,
    },
    orderBy: { createdAt: "desc" },
    select: {
      type: true,
      content: true,
      confidence: true,
      createdAt: true,
    },
  });
}
