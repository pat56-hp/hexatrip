import { StatusCodes } from "http-status-codes";
import Trip from "../../models/Trip.js";
import { categoryCodes, tags } from "../../helpers/data.js";
import { uploadFile } from "../../helpers/helper.js";

/**
 * Recuperation de tous les trip
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAll = async (req, res) => {
  try {
    //Filter
    const params = req.query;
    let formattedParams = {};

    // filtre en fonction de la region
    params.region &&
      params.region !== "0" &&
      (formattedParams.region = parseInt(params.region));

    // filtre en fonction de la duree
    params.duration &&
      params.duration !== "0" &&
      (formattedParams.duration = parseInt(params.duration));

    //Filtre en fonction de la ville
    params.town &&
      (formattedParams.town = { $regex: params.town, $options: "i" });

    //Filtre en fonction du prix maximum
    params.price && (formattedParams.adultPrice = { $lte: params.price });

    //Filtre en fonction de la categorie
    if (params.category && params.category !== "0") {
      const category = categoryCodes.find(
        (cat) => cat.code === parseInt(params.category)
      );
      category && (formattedParams.category = category.name);
    }

    //Filtre en fonction des tags
    if (params.tags && params.tags !== "0") {
      const tag = tags.find((tag) => tag.code === params.tag);
      tag && (formattedParams.tags = tag.name);
    }

    const trips = await Trip.find(formattedParams);
    return res.status(StatusCodes.OK).json({
      data: trips,
      message: "Fetch data of trips successfully",
    });
  } catch (error) {
    console.error("Failed to fetch datas of trip: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to fetch data trip : " + error.message,
    });
  }
};

/**
 * Recuperation des bestsellers
 * @param {*} _
 * @param {*} res
 * @returns
 */
export const getAllBestsellers = async (_, res) => {
  try {
    const trips = await Trip.find({ tags: "bestseller" });

    return res.status(StatusCodes.OK).json({
      data: trips,
      message: "Fetched trips bestsellers",
    });
  } catch (error) {
    console.error("Failed to fetch datas of Trips bestseller : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:
        " Internal server error when fetching datas Trip bestseller : " +
        error.message,
    });
  }
};

/**
 * Creation d'un trip
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const store = async (req, res) => {
  const body = req.body;

  //On verifie si le body n'est pas vide
  if (!body || !body?.title) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: "Title is required",
    });
  }

  try {
    const newTrip = await Trip.create(body);
    return res.status(StatusCodes.CREATED).json({
      data: newTrip,
      message: "Trip created successfully",
    });
  } catch (error) {
    console.error("Failed to create trip : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed trip creation : " + error.message,
    });
  }
};

/**
 * Mise à jour d'un trip
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const files = req.files;

    //Recuperation du trip
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Trip not found",
      });
    }

    //On verifie si le body n'est pas vide
    if (!body || !body?.title) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        error: "Title is required",
      });
    }

    //Upload et sauvegarde des images
    let images = [];
    if (files) {
      let image = null;
      await Promise.all(
        files.map(async (file) => {
          image = await uploadFile(file, id, "../../public/images/trips").then(
            (res) => {
              return res;
            }
          );

          images.push(image);
        })
      );
    }

    //Mise à jour du trip
    trip.set(body);
    trip.images = images;
    const tripUpdated = await trip.save();
    return res.status(StatusCodes.OK).json({
      data: tripUpdated,
      message: "Trip updated successfully",
    });
  } catch (error) {
    console.error("Failed to update trip : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update trip : " + error.message,
    });
  }
};

/**
 * Recuperation d'un trip par son id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Trip not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      data: trip,
      message: "Trip fetched successfully",
    });
  } catch (error) {
    console.error("Failed to show trip : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to show trip : " + error.message,
    });
  }
};

/**
 * Suppression d'un trip
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Trip not found",
      });
    }

    await trip.deleteOne();

    return res.status(StatusCodes.OK).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete trip : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete trip : " + error.message,
    });
  }
};

/**
 * Suppression de tous les trips
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteAll = async (req, res) => {
  try {
    const result = await Trip.deleteMany();
    if (result.deletedCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Nothing to delete",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "All trips deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete all trips : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete all trips : " + error.message,
    });
  }
};
