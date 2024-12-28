import { app, BrowserWindow } from "electron";
import path from "path";

// For ES module, handle path resolution
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Make sure the preload.js exists
      nodeIntegration: false, // Keep secure setup, do not allow node in renderer
      contextIsolation: true, // Required for contextBridge
    },
  });

  // Check if it's in development or production mode
  if (process.env.NODE_ENV === "development") {
    console.log("Development Mode: Loading Vite server...");
    mainWindow.loadURL("http://localhost:5173"); // Vite's default dev server port
  } else {
    // console.log("Development Mode: Loading Vite server...");
    // mainWindow.loadURL('http://localhost:5173');  // Vite's default dev server port

    // In production, load from the dist folder
    const indexPath = path.join(__dirname, "../dist/index.html");
    console.log("Production Mode: Loading from", indexPath);
    mainWindow.loadFile(indexPath).catch((err) => {
      console.error("Failed to load production file:", err);
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
