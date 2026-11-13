import "dotenv/config.js";
import app from "./app.js";
import connectDB from "./config/db.js";

import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);


const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
