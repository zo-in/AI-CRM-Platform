import {
  createDealService,
  getDealService,
  updateDealService,
  deleteDealService,
  getDealsForCustomerService,
} from "../services/dealService.js";

export async function createDeal(req, res) {
  try {
    const deal = await createDealService(req.body);
    res.status(201).json(deal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getDealById(req, res) {
  try {
    const deal = await getDealService(req.params.id);
    if (!deal) return res.status(404).json({ error: "Deal not found" });
    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateDeal(req, res) {
  try {
    const deal = await updateDealService(req.params.id, req.body);
    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteDeal(req, res) {
  try {
    await deleteDealService(req.params.id);
    res.status(200).json({ message: "Deal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getDealsForCustomer(req, res) {
  try {
    const deals = await getDealsForCustomerService(req.params.id);
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
