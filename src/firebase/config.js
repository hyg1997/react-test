import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "./config.json";

const hostName = window.location.hostname;

const currentEnvironment = hostName === "url-production" ? "production" : "development";

const currentConfig = config[currentEnvironment];

firebase.initializeApp(currentConfig.firestore);

const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

let pageLoaded = false;
firestore
    .collection("versions")
    .onSnapshot(() => {
        pageLoaded && document.location.reload(true);
        pageLoaded = true;
    });

export {
    firebase,
    firestore,
    storage,
    auth,
    currentConfig
};
