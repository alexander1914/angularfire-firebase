import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { onDocumentCreated, onDocumentDeleted, onDocumentUpdated } from "firebase-functions/v2/firestore";

export const helloWorld = onRequest((request, response) => {
    logger.info("Executando função com Node 22!");
    response.send("Deploy realizado com sucesso!");
});

export const onAddCourseUpdatePromoCounter = onDocumentCreated({
    document: "courses/{courseId}",
    memory: "128MiB",
    timeoutSeconds: 300
}, async (event) => {

    const module = await import("./promotions-counter/on-add-course.js") as unknown as {
        default: (event: any) => Promise<void>
    };

    await module.default(event);
});

export const onCourseUpdatedUpdatePromoCounter = onDocumentUpdated({
    document: "courses/{courseId}"
}, async (event) => {
    
    if (!event.data) {
        console.error("No data associated with this event");
        return;
    }

    const module = await import("./promotions-counter/on-update-course.js") as unknown as {
        default: (event: any) => Promise<void>
    };

    await module.default(event);
});

export const onCourseDeletedUpdatePromoCounter = onDocumentDeleted({
    document: "courses/{courseId}"
}, async (event) => {
    
    if (!event.data) {
        console.error("No data associated with this event");
        return;
    }

    const module = await import("./promotions-counter/on-delete-course.js") as unknown as {
        default: (event: any) => Promise<void>
    };

    await module.default(event);
});