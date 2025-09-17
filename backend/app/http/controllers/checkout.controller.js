import { StatusCodes } from "http-status-codes";
import { hotelTax } from "../../helpers/data.js";
import Trip from "../../models/Trip.js";
import Order from "../../models/Order.js";
import Stripe from "stripe";

export const createStripeSession = async (req, res) => {
  try {
    //initialisation de stripe
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

    //importation des elements de req
    const { order, items } = req.border;
    const { token } = req.cookies;

    //Recuperer les elements (Trip) vendus (En tableau items[0])
    const trip = await Trip.findById(items[0].id);

    //Transaction via stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: trip.title,
            },
            unit_amount:
              trip.adultPrice * items[0].adults +
              trip.youngPrice * items[0].kids +
              hotelTax,
          },
          quantity: item.quantity,
        };
      }),
      success_url:
        process.env.NODE_ENV === "production"
          ? `${process.env.CLIENT_URL_PROD}/checkout-success`
          : `${process.env.CLIENT_URL_LOCAL}/checkout-success`,
      cancel_url:
        process.env.NODE_ENV === "production"
          ? `${process.env.CLIENT_URL_PROD}/checkout`
          : `${process.env.CLIENT_URL_LOCAL}/checkout`,
    });

    /**Normalement, Verification du paiement**/

    //Ecriture de l'ordre d'achat dans Order
    if (!token) {
      await Order.create({ ...order, email: "guest@gmail.com" });
    } else await Order.create(order);

    //Sortie
    return res.status(StatusCodes.OK).json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erreur lors du paiement : " + error.message,
    });
  }
};
