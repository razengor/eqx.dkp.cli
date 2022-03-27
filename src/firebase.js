import { initializeApp } from "firebase/app";
// eslint-disable-next-line
const firebaseConfig = {
    apiKey: "AIzaSyAITvetp-Z2Cx3gBVXy9Xb9W9sIvIVYHIk",
    authDomain: "equinox-desktop.firebaseapp.com",
    databaseURL: "https://equinox-desktop.firebaseio.com",
    projectId: "equinox-desktop",
    storageBucket: "equinox-desktop.appspot.com",
    messagingSenderId: "800105579617",
    appId: "1:800105579617:web:b2955698f0b2103c57d620"
};

const app = initializeApp(firebaseConfig);

export default app;
