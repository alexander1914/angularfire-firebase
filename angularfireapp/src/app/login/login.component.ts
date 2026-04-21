import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    ui!: firebaseui.auth.AuthUI;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private ngZone: NgZone) {
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.ngZone.run(() => this.router.navigateByUrl('/courses'));
            }
        });

        this.afAuth.app.then(app => {
            const uiConfig = {
                signInOptions: [
                    {
                        provider: EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: true // It's remove name and lastName
                    },
                    GoogleAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    signInSuccessWithAuthResult: this.onLoginSuccessfull.bind(this)
                },
                signInFlow: 'popup' // Melhora a experiência em relação ao redirecionamento
            };

            this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(app.auth());

            this.ui.start("#firebaseui-auth-container", uiConfig);

            //this.ui.disableAutoSignIn();
        });
    }

    ngOnDestroy() {
        if (this.ui) {
            this.ui.reset(); // Limpa o formulário e volta para a estaca zero
            this.ui.delete();
        }
    }

    onLoginSuccessfull(result: any): boolean {

        console.log("Login com sucesso:", result);

        // 5. O segredo principal: NgZone.run faz o Angular "acordar" e mudar de página
        this.ngZone.run(() => {
            this.router.navigateByUrl("/courses");
        });

        return false; // Importante para não deixar o FirebaseUI tentar redirecionar sozinho
    }
}


