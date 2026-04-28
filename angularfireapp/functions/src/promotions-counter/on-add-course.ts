import { FieldValue } from "firebase-admin/firestore";
import { db } from "../init";
import * as logger from "firebase-functions/logger";

export default async (event: { data: any; params: { courseId: any; }; }) => {
    const snap = event.data;
    if (!snap) return;

    const course = snap.data();
    const courseId = event.params.courseId;

    logger.debug(`Running add course trigger for courseId ${courseId}`);

    if (course.promo) {
        const counterRef = db.doc("courses/stats");

        try {
            await counterRef.set({
                totalPromo: FieldValue.increment(1)
            }, { merge: true });
        } catch (error) {
            logger.error("Erro ao atualizar contador:", error);
        }
    }
}