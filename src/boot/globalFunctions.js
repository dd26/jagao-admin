import Vue from 'vue'
import env from '../env'

Vue.prototype.$api_url = function () {
  return env.apiUrl
}
