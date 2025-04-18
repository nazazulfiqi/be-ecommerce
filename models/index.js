import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup koneksi database with correct env variable names
const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Changed from DB_NAME
  process.env.DB_USERNAME, // Changed from DB_USER
  process.env.DB_PASSWORD, // Changed from DB_PASS
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // Use the dialect from env
    port: process.env.DB_PORT, // Added port from env
  }
);

const db = {};

// Use the directory where index.js is located
const modelsPath = __dirname;
console.log("Models path:", modelsPath);

async function loadModels() {
  try {
    const resolvedModelsPath = path.resolve(modelsPath);
    console.log("Resolved models path:", resolvedModelsPath);
    const files = await fs.promises.readdir(resolvedModelsPath);

    for (const file of files) {
      if (file.endsWith(".model.js") && file !== "index.model.js") {
        // Avoid loading index.js itself
        try {
          // Use a relative path for import
          const modelPath = `./${file}`;
          const { default: defineModel } = await import(modelPath);
          const model = defineModel(sequelize, DataTypes);
          db[model.name] = model;
          console.log(`Loaded model: ${model.name}`);
        } catch (modelError) {
          console.error(`Error loading model ${file}:`, modelError);
        }
      }
    }

    // Menyusun relasi antar model jika ada
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    return db;
  } catch (err) {
    console.error("Error loading models: ", err);
    throw err;
  }
}

// Test database connection before loading models
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
    return loadModels();
  })
  .then(() => {
    console.log("Models loaded successfully.");
  })
  .catch((err) => {
    console.error("Error:", err);
  });

export default db;
