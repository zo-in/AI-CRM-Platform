import { getActivityFeed } from "../services/activityService.js";

export async function getAllActivity(req, res) {
  try {
    const activity = await getActivityFeed();
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
