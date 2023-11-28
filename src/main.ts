import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from "jquery";

const app = createApp(App)
app.use(router)
app.use(jQuery);

app.mount('#app')
