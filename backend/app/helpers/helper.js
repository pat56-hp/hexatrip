import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

/**
 * Upload SingleFIle
 * @param {File} file
 * @param {String} directory
 * @returns
 */
const uploadFile = async (file, directory) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const uploadPath = path.join(__dirname, directory, id, file.originalname);

  const directory = path.dirname(uploadPath);
  await fs.mkdir(directory, { recursive: true }); //create directory if it's not exist
  await fs.writeFile(uploadPath, file.buffer); //write file on directory

  return file.originalname;
};

export { uploadFile };
