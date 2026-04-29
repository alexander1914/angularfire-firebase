# Angular Fire with Firebase

### I love to create many solutions to help society now

- 🔭 I'm currently working on **contents about angular-fire and Firebase need more able to work this new tech**

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://github.com/alexander1914" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg" alt="alexander1914" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://developer.mozilla.org/en-US/docs/Web/angular" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=angular" alt="angular" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/css3" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=css" alt="css3" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/firebase" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=firebase" alt="firebase" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/git" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=git" alt="git" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/html5" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=html" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/nodejs" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=nodejs" alt="nodejs" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/typescript" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=ts" alt="typescript" width="40" height="40"/> </a></p>

### Set up enviroment with Angular Fire and Firebase

    npm install --legacy-peer-deps

You will prefer to test local it's neccessary to change (angularfireapp/src/environments/environment.dev.ts) and check the flag 
useEmulators: false, // To run a enviroment local by firebase emulators then to change (angularfireapp/src/app/app.module.ts)(angularfireapp/src/environments/environment.dev.ts)

## Firebase Functions

OBS: folder functions

    npm install 

I can't run all functions local but you can change for production and to do just deploy for firebase.

Script to allow admin 

    node angularfireapp\functions\scripts\init-admin.js angularfireapp\functions\scripts\angularfire-2a7c1-2282369402b4.json YOUR_ACTUAL_USER_UID

YOUR_ACTUAL_USER_UID -> this number will find firebase authentication UserUid

OBS:
I defined the user obr.nathi27@gmail.com like admin password 123456