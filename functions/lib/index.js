"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.getBooks = functions.https.onCall((data, context) => {
    return db.collection('books').get()
        .then(result => {
        let str = '';
        result.forEach(doc => {
            const docData = doc.data();
            const id = (docData.asin !== void 0) ? docData.asin : docData.isbn13;
            str += doc.id + ' => ' + docData.title + ', ' + docData.author + ', ' + id + '\n';
        });
        return str;
    })
        .catch(error => error);
});
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map