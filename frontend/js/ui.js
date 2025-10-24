function showAlert(msg, type = 'info') {
  const alertBox = document.getElementById('alertBox');
  alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">${msg}</div>`;
  setTimeout(() => { alertBox.innerHTML = ''; }, 4000);
}