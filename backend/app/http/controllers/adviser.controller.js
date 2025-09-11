import { StatusCodes } from "http-status-codes";
import Adviser from "../../models/Adviser.js";
import { uploadFile } from "../../helpers/helper.js";

//Get All advisers
export const getAll = async (req, res) => {
  try {
    const params = req.query;

    //filter by query params
    let formattedParams = {};
    if (params.town) {
      formattedParams.tags = { $regex: params.town, $options: "i" };
    }

    //get all advisers
    const advisers = await Adviser.find(formattedParams);
    return res.status(StatusCodes.OK).json({
      data: advisers,
      message: "Advisers fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching advisers:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while fetching advisers: ${error.message}`,
    });
  }
};

/**
 * Update adviser
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    //On verifie si le body contient un element
    if (!body) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        error: "Aucune donnée renseignée",
      });
    }

    //On verifie si l'entite existe
    const adviser = await Adviser.findById(id);
    if (!adviser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Aucune donnée trouvée",
      });
    }

    //Gestion de l'image
    const file = req.file;
    let imageName = null;
    if (file) {
      //Upload de l'image
      imageName = await uploadFile(
        file,
        id,
        "../../public/images/advisers"
      ).then((res) => {
        return res;
      });
    }

    //update Adviser and save Adviser updated
    adviser.set(body);
    adviser.image = imageName; // Save image
    await adviser.save();

    return res.status(StatusCodes.OK).json({
      data: adviser,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error updated adviser:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while updating adviser: ${error.message}`,
    });
  }
};

//Store a new adviser
export const store = async (req, res) => {
  const body = req.body;
  if (!body?.name || !body) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: "Name is required" });
  }

  try {
    await Adviser.create(req.body);
    return res.status(StatusCodes.CREATED).json({ message: "Adviser created" });
  } catch (error) {
    console.error("Error creating adviser:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while creating the adviser: ${error.message}`,
    });
  }
};

//Show an adviser
export const show = async (req, res) => {
  try {
    const param = req.params.id;

    const adviser = await Adviser.findById(param);
    if (!adviser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Adviser not found" });
    }

    return res.status(StatusCodes.OK).json({
      data: adviser,
      message: "Adviser fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching adviser:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `An error occurred while fetching the adviser: ${error.message}`,
    });
  }
};
