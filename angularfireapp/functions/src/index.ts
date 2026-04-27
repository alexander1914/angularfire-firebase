import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./init";

export const helloWorld = onRequest((request, response) => {
  logger.info("Executando função com Node 22!");
  response.send("Deploy realizado com sucesso!");
});

export const onAddCourseUpdatePromoCounter = onDocumentCreated({
    document: "courses/{courseId}",
    memory: "128MiB",
    timeoutSeconds: 300
}, async (event) => {
    const snap = event.data;
    if (!snap) return;

    const course = snap.data();
    const courseId = event.params.courseId;

    logger.debug(`Running add course trigger for courseId ${courseId}`);

    // Só prossegue se 'promo' for verdadeiro
    if (course.promo) {
        const counterRef = db.doc("courses/stats");

        try {
            // FieldValue.increment não precisa de transação manual
            // Ele resolve o conflito de escrita no lado do servidor
            await counterRef.set({
                totalPromo: FieldValue.increment(1)
            }, { merge: true }); // 'merge' garante que não sobrescreva outros campos em 'stats'
            
        } catch (error) {
            logger.error("Erro ao atualizar contador:", error);
        }
    }
});