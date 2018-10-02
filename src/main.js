// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
Vue.config.productionTip = false
let app
var config = {
  apiKey: 'AIzaSyApcmJlfa9oUaulQoHfKWPBf6xs4VUkEGQ',
  authDomain: 'zwebwriter.firebaseapp.com',
  databaseURL: 'https://zwebwriter.firebaseio.com',
  projectId: 'zwebwriter',
  storageBucket: 'zwebwriter.appspot.com',
  messagingSenderId: '819725404170'
}
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
/* eslint-disable no-new */
