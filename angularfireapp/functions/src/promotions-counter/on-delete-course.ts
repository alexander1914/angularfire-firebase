import * as logger from "firebase-functions/logger";
import { db } from "../init";
import { FieldValue } from "firebase-admin/firestore";

export default async (change: any, context: any) => {
    logger.debug(`Running update course trigger for courseId ${context.params.courseId}`);

    const course = change.data();

    if (!course.promo) {
        return;
    }

    return db.doc("courses/stats").update({
        totalPromo: FieldValue.increment(-1)
    });
}