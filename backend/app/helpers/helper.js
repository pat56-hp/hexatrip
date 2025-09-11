import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

/**
 * Upload SingleFIle
 * @param {File} file
 * @param {String} id
 * @param {String} directory
 * @returns
 */
const uploadFile = async (file, id, pathContent) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const uploadPath = path.join(__dirname, pathContent, id, file.originalname);

  const directory = path.dirname(uploadPath);
  await fs.mkdir(directory, { recursive: true }); //create directory if it's not exist
  await fs.writeFile(uploadPath, file.buffer); //write file on directory

  return file.originalname;
};

export { uploadFile };
