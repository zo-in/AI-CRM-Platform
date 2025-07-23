import express from "express";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/customers", customerRoutes);
app.use("/interactions", interactionRoutes);
app.use("/deals", dealRoutes);
app.use("/activity", activityRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
