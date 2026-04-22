import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../model/course';
import { catchError, concatMap, last, map, take, tap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  courseId!: string;

  percentageChanges$!: Observable<number | undefined>;

  iconUrl!: string;

  //To create Validators your form
  form = this.fb.group({
    description: ['', Validators.required],
    category: ["BEGINNER", Validators.required],
    url: [''],
    longDescription: ['', Validators.required],
    promo: [false],
    promoStartAt: [null]
  })  

  constructor(private fb: FormBuilder,
    private coursesService: CoursesService,
    private afs: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage) {
  }

  ngOnInit() {
    // this method is AngularFirestore to create ID your entity
    this.courseId = this.afs.createId();
  }

  onCreateCourse() {

    const formValue = this.form.value;

    //Binding of form to Entity on firebasestore
    const newCourse: Partial<Course> = {
      description: formValue.description,
      url: formValue.url,
      longDescription: formValue.longDescription,
      promo: formValue.promo,
      categories: [formValue.category]
    }

    //a way to convert a Data with lib firebase
    newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);

    console.log(newCourse);

    this.coursesService.createCourse(newCourse, this.courseId)
      .pipe(
        tap(course => {
          console.log("Created new course: ", course);
          this.router.navigateByUrl("/courses");
        }),
        catchError(err => {
          console.log(err);
          alert("Couldn't create new course.");
          return throwError(err);
        })

      )
      .subscribe();
  }

  uploadThumbnail($event: any) {

    const file: File = $event.target.files[0];

    const filePath = `courses/${this.courseId}${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });

    this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL()),
        tap(url => this.iconUrl = url),
        catchError(error => {
          console.log(error);
          alert("Could not create thumbnail url.");
          return throwError(error);
        })
      )
      .subscribe();

  }

}
