import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../model/course';
import { map } from 'rxjs/operators';
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
}
