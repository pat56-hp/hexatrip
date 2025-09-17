/**
 * Configuration du cors
 */

const allowedOrigins = ["https//....", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    // Verifie si la requete est authorise
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //Origin accepted
      callback(null, true);
    } else {
      //Origin not allowd
      callback(new Error("Not allowed by cors"));
    }
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], //Seulement les methods authorises
  allowedHeaders: ["Content-Type", "Authorization", "X-Forwarded-For"], //Only request theses methods
  credentials: true, //Allow cookies exchange and headers authentication
};

export default corsOptions;
