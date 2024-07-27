import app from "./app.js";
import recoveryApp from "./recovery.js";
import changePasswordApp from "./changePassword.js"; // Importar changePassword.js
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import getUserDataApp from "./getUserData.js"; // Importar userDataApp.js

async function main() {
    try {
        await connectDB();

        // Montar recoveryApp y changePasswordApp en la aplicación principal
        app.use(recoveryApp);
        app.use(changePasswordApp);
        app.use(getUserDataApp);

        app.listen(PORT, () => {
            console.log(`Listening on port http://localhost:${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.error(error);
    }
}

main();
