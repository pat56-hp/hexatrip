import { StatusCodes } from "http-status-codes";
import Agency from "../../models/Agency.js";
import { uploadFile } from "../../helpers/helper.js";

//Get all agencies
export const getAll = async (req, res) => {
  try {
    const agencies = await Agency.find({});
    return res.status(StatusCodes.OK).json({
      data: agencies,
      message: "Agencies fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching agencies:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching agencies" });
  }
};

//Store a new agency
export const store = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Body is empty" });
  }

  try {
    const newAgency = await Agency.create(body);
    return res.status(StatusCodes.CREATED).json({
      data: newAgency,
      message: "Agency created successfully",
    });
  } catch (error) {
    console.error("Error creation agency:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creation agency" });
  }
};

//Show a single agency by ID
export const show = async (req, res) => {
  const { id } = req.params;

  try {
    const agency = await Agency.findById(id);
    if (!agency) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Agency not found" });
    }

    return res.status(StatusCodes.OK).json({
      data: agency,
      message: "Agency fetched successfully",
    });
  } catch (error) {
    console.error("Error getting agency:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting agency" });
  }
};

//update a single agency by ID
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const file = req.file;

    //On verifie si le body contient un element
    if (!body) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        error: "Aucune donnée renseignée",
      });
    }

    //On verifie si l'entite existe
    const agency = await Agency.findById(id);
    if (!agency) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Aucune donnée trouvée",
      });
    }

    //Gestion de l'image
    let photoName = null;
    if (file) {
      //Upload de l'image
      photoName = await uploadFile(
        file,
        id,
        "../../public/images/agencies"
      ).then((res) => {
        return res;
      });
    }

    //Sauvegarde des infos
    agency.set(body);
    agency.photo = photoName;
    await agency.save();

    return res.status(StatusCodes.OK).json({
      data: agency,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error updated agency:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while updating agency: ${error.message}`,
    });
  }
};
