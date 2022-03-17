
export function updateAccessToken (state, JAGAO_SESSION_INFO) {
  if (JAGAO_SESSION_INFO) {
    state.JAGAO_SESSION_INFO = JAGAO_SESSION_INFO
    // state.userFullName = JAGAO_SESSION_INFO.name + ' ' + JAGAO_SESSION_INFO.lastName
  } else {
    state.JAGAO_SESSION_INFO = {}
  }
}

export function login (state, data) {
  localStorage.setItem('JAGAO_SESSION_INFO', JSON.stringify(data))
  state.JAGAO_SESSION_INFO = data.JAGAO_SESSION_INFO
  state.user = data.user
}

export function dataUser (state, data) {
  console.log(data)
  state.user = data
}

export function logout (state) {
  localStorage.removeItem('JAGAO_SESSION_INFO')
  state.JAGAO_SESSION_INFO = ''
  state.user = ''
}
