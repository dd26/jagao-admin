import Vue from 'vue'
import env from '../env'
import { date } from 'quasar'

Vue.prototype.$api_url = function () {
  return env.apiUrl
}

Vue.prototype.$formatDate = function (fdate, format) {
  return date.formatDate(fdate, format)
}
