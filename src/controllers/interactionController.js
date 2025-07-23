import {
  summarizeAndMergeMemory,
  createInteractionService,
  getMemoryByCustomerId,
} from "../services/interactionService.js";

export async function summarizeInteraction(req, res) {
  try {
    const result = await summarizeAndMergeMemory(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createInteraction(req, res) {
  try {
    const { customerId, type, notes } = req.body;
    if (!customerId || !type || !notes) {
      return res
        .status(400)
        .json({ error: "customerId, type, and notes are required" });
    }

    const interaction = await createInteractionService({
      customerId,
      type,
      notes,
    });
    res.status(201).json(interaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCustomerMemory(req, res) {
  try {
    const { customerId } = req.params;
    const memory = await getMemoryByCustomerId(customerId);
    res.status(200).json(memory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
