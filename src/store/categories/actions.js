export function getCategories ({ commit }) {
  commit('updateAccessToken', JSON.parse(localStorage.getItem('JAGAO_SESSION_INFO')))
}
