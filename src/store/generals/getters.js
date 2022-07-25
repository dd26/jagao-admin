/*
* Se verifica que el usuario puede ver un item determinado según sus permisos guardados en localstorage
*/
export function can () {
  return permission => {
    const userInfo = JSON.parse(localStorage.getItem('JAGAO_SESSION_INFO'))
    const userPermissions = userInfo.permissions.map(permission => permission.slug)
    return userPermissions.includes(permission)
  }
}

export function UserInfo (state) {
  return JSON.parse(localStorage.getItem('JAGAO_SESSION_INFO'))
}
