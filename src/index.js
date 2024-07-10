import app from "./app.js";
import recoveryApp from "./recovery.js"; // Importar recovery.js
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

async function main() {
  try {
    await connectDB();

    // Montar recoveryApp en la aplicación principal
    app.use(recoveryApp);

    app.listen(PORT, () => {
      console.log(`Listening on port http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
