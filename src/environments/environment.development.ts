export const environment = {
    prod: false,
    firebase:{
        apiKey: process.env["FIREBASE_API_KEY"],
        authDomain: process.env["FIREBASE_AUTH_DOMAIN"],
        projectId: process.env["FIREBASE_PROJECT_ID"],
        storageBucket: process.env["FIREBASE_STORAGE_BUCKET"],
        messagingSenderId: process.env["FIREBASE_MESSAGING_SENDERID"],
        appId: process.env["FIREBASE_APPID"]
      }
};
