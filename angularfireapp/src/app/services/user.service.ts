import { Injectable } from "@angular/core";
import {AngularFireAuth} from '@angular/fire/auth';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UserService {

    isLoggedIn$!: Observable<boolean>;
    isLoggedOut$!: Observable<boolean>;
    pictureUrl$!: Observable<string>;

    constructor(private afAuth: AngularFireAuth){
        afAuth.idToken.subscribe(jwt => console.log("jwt", jwt));
        afAuth.authState.subscribe(auth => console.log("auth", auth));
        
    }

}