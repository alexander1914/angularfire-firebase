import * as logger from "firebase-functions/logger";
import { auth, db } from "./init";

const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

export const createUserApp = express();

createUserApp.use(bodyParser.json());
createUserApp.use(cors({ origin: true }));

createUserApp.post("/", async (request: any, response: any) => {
    logger.debug(`Calling create user function.`);

    try {
        const email = request.body.email,
            password = request.body.password,
            admin = request.body.admin;

        const user = await auth.createUser({
            email,
            password
        });

        await auth.setCustoUserClaims(user.uid, { admin });

        db.doc(`users/${user.uid}`).set({})

        request.status(200).json({ message: "User created successfully" });
    } catch (error) {
        logger.error(`Could not create new user.`, error);
        response.status(500).json({ message: "Could not create user now." });
    }
});