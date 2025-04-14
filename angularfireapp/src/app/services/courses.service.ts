import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../model/course';
import { concatMap, map } from 'rxjs/operators';
import { convertSnaps } from './utils';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) { }

  loadCoursesByCategory(category: string): Observable<Course[]> {

    return this.db.collection(
      "courses",
      ref => ref.where("categories", "array-contains", category)
        .orderBy("seqNo")
    )
      .get()
      .pipe(
        map(results => convertSnaps(results))
      );
  }

  createCourse(newCourse: Partial<Course>, courseId?: string) {
    return this.db.collection("courses",
      ref => ref.orderBy("seqNo", "desc").limit(1))
      .get()
      .pipe(
        concatMap(result => {

          const courses = convertSnaps<Course>(result);

          const lastCourseSeqNo = courses[0]?.seqNo ?? 0;

          const course = {
            ...newCourse,
            seqNo: lastCourseSeqNo + 1
          }

          let save$: Observable<any>;

          if (courseId) {
            //To implement a logic to save new entity on firebasestore by ID
            save$ = from(this.db.doc(`courses/${courseId}`).set(course));
          } else {
            //To implement a logic to save new entity on firebasestore automatily
            save$ = from(this.db.collection("courses").add(course));
          }

          return save$
            .pipe(
              map(res => {
                return {
                  id: courseId ?? res.id,
                  ...course
                }
              })

            );

        })
      )
  }

  updateCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return from(this.db.doc(`courses/${courseId}`).update(changes));
  }

  deleteCourse(courseId: string) {
    return from(this.db.doc(`courses/${courseId}`).delete());
  }
}
