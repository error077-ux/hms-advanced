document.addEventListener('DOMContentLoaded', async () => {
  // Fetch profile
  try {
    const profile = await apiFetch('/patient/me');
    document.getElementById('patientName').textContent = profile.name;
  } catch (e) {
    showAlert('Not logged in.', 'danger');
    setTimeout(logout, 1000);
    return;
  }

  // Appointments
  async function loadAppointments() {
    const appointments = await apiFetch('/patient/appointments');
    const table = document.getElementById('appointmentsTable');
    table.innerHTML = `<tr><th>Date</th><th>Time</th><th>Doctor</th><th>Status</th></tr>` +
      appointments.map(a => `<tr>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>${a.doctor_name}</td>
        <td>${a.status}</td>
      </tr>`).join('');
  }
  await loadAppointments();

  // Book appointment
  document.getElementById('bookForm').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    try {
      await apiFetch('/patient/appointments', { method: 'POST', body: data });
      showAlert('Appointment booked!', 'success');
      document.querySelector('#bookModal .btn-close').click();
      await loadAppointments();
    } catch (err) {
      showAlert('Booking failed: ' + err.message, 'danger');
    }
  };

  // Insurance upload
  document.getElementById('insuranceForm').onsubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await fetch(API_BASE + '/patient/insurance/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': 'Bearer ' + getToken() }
      });
      showAlert('Insurance uploaded!', 'success');
      await loadInsurance();
    } catch (err) {
      showAlert('Upload failed', 'danger');
    }
  };

  // Insurance list
  async function loadInsurance() {
    const insurance = await apiFetch('/patient/insurance');
    document.getElementById('insuranceList').innerHTML =
      insurance.map(doc => `<li><a href="${API_BASE}/patient/insurance/download/${doc.file_name}" target="_blank">${doc.file_name}</a></li>`).join('');
  }
  await loadInsurance();
});