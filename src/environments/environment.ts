// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyD7PJACWGdPyIKL5YqtWA0_47dSrD2kmew",
    authDomain: "todo-app-fde56.firebaseapp.com",
    databaseURL: "https://todo-app-fde56.firebaseio.com",
    projectId: "todo-app-fde56",
    storageBucket: "todo-app-fde56.appspot.com",
    messagingSenderId: "677267427300"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
