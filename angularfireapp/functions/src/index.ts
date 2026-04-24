import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const helloWorld = onRequest((request, response) => {
  logger.info("Executando função com Node 22!");
  response.send("Deploy realizado com sucesso!");
});