export function setUserInfo(username) {
  localStorage.setItem("username", username)
}

export function getUserInfo() {
  return localStorage.getItem("username")
}

export function removeUserInfo() {
  localStorage.removeItem("username")
}