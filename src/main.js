import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import { currency } from './utils/currency'
Vue.filter('currency', currency)
import { 
  Button, 
  Popup,
  Icon,
  Picker
} from 'vant';
Vue.use(Button);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Icon);
import eg from './utils/lang/eg'
import mxg from './utils/lang/mxg'
Vue.prototype.title = eg
Vue.prototype.executeLang = function(e) {
  if (e === 'eg') {
    Vue.prototype.title = eg
  } else {
    Vue.prototype.title = mxg
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
