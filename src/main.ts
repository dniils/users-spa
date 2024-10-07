import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Paginator from "primevue/paginator";
import Aura from "@primevue/themes/aura";

const app = createApp(App);
app.component("Paginator", Paginator);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.mount("#app");
