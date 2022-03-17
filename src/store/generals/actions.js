export function fetchAccessToken ({ commit }) {
  commit('updateAccessToken', JSON.parse(localStorage.getItem('JAGAO_SESSION_INFO')))
}
export function logout ({ commit }) {
  localStorage.removeItem('JAGAO_SESSION_INFO')
  commit('logout')
}
