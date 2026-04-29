import * as logger from "firebase-functions/logger";
import { auth } from "./init";

export function getUserCredentialsMiddleware(request: any, response: any, next: any) {
    logger.debug(`Attempting to extract user credentials from request.`);

    const jwt = request.headers.authorization;

    if (jwt) {
        auth.verifyIdToken(jwt)
            .then((jwtPayload: { uid: any; admin: any; }) => {
                request["uid"] = jwtPayload.uid;
                request["admin"] = jwtPayload.admin;

                logger.debug(`Creadentials: uid=${jwtPayload.uid}, admin=${jwtPayload.admin}`);

                next();
            })
            .catch((err: any) => {
                console.log("Error ocurred while validating JWT", err);
                next()
            });
    } else {
        next();
    }
}