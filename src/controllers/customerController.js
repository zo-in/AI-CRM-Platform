import {
  createCustomerService,
  getCustomerService,
  updateCustomerService,
  deleteCustomerService,
  searchCustomersService,
} from "../services/customerService.js";

export async function createCustomer(req, res) {
  try {
    const { name, email, phone, company } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const customer = await createCustomerService({
      name,
      email,
      phone,
      company,
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCustomerById(req, res) {
  try {
    const customer = await getCustomerService(req.params.id);
    if (!customer || customer.deletedAt)
      return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCustomer(req, res) {
  try {
    const customer = await updateCustomerService(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteCustomer(req, res) {
  try {
    await deleteCustomerService(req.params.id);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function searchCustomers(req, res) {
  try {
    const query = req.query.q || "";
    const results = await searchCustomersService(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
