// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSocketIO from 'vue-socket.io';
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import VueFusionCharts from 'vue-fusioncharts';
import SvgTransition from "vue-svg-transition";
import App from './App'
import router from './router'



// Resolve the dependencies
Charts(FusionCharts);
PowerCharts(FusionCharts);
Widgets(FusionCharts);
FusionTheme(FusionCharts);

// Globally register the components for project-wide use
Vue.use(VueFusionCharts, FusionCharts);
Vue.use(SvgTransition);


Vue.use(BootstrapVue);

var backend = false;
Vue.use(Vuetify);

Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://localhost:3001",
}))

Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  sockets: {
    connect() {
      console.log("socket connected...")
    },
    disconnected() {
      console.log("socket disconnected...")
    }
  },
  template: '<App/>'
})
