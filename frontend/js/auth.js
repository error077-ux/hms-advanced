function getToken() {
  return localStorage.getItem('token');
}
function setToken(token) {
  localStorage.setItem('token', token);
}
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}