import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import { VueFire, VueFireAppCheck } from "vuefire";
import { ReCaptchaV3Provider } from "firebase/app-check";

import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".dark",
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
});

// Your web app's Firebase configuration
const firebaseConfig = {
  // Ignore GitHub scan, this is not a secret key: https://firebase.google.com/docs/projects/api-keys
  apiKey: "AIzaSyBOt-VQMVFirNGzdbfnmnBOmMDtoiyKQA8",
  authDomain: "saving-jar-coop.firebaseapp.com",
  projectId: "saving-jar-coop",
  storageBucket: "saving-jar-coop.firebasestorage.app",
  messagingSenderId: "341615997866",
  appId: "1:341615997866:web:f5dd67e006a2479efd71d3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAppCheck({
      provider: new ReCaptchaV3Provider("6LfWA4sqAAAAAFxZcQKn8TRhlJWhZHvrpLMmpxRN"),
      debug: true,
      isTokenAutoRefreshEnabled: true,
    }),
  ],
});

app.mount("#app");
