document.addEventListener('DOMContentLoaded', async () => {
  // Fetch doctor profile
  try {
    const profile = await apiFetch('/doctor/me');
    document.getElementById('doctorName').textContent = profile.name;
  } catch (e) {
    showAlert('Not logged in.', 'danger');
    setTimeout(logout, 1000);
    return;
  }

  // Appointments
  async function loadAppointments() {
    const appointments = await apiFetch('/doctor/appointments');
    const table = document.getElementById('appointmentsTable');
    table.innerHTML = `<tr><th>ID</th><th>Date</th><th>Time</th><th>Patient</th><th>Status</th></tr>` +
      appointments.map(a => `<tr>
        <td>${a.id}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>${a.patient_name}</td>
        <td>${a.status}</td>
      </tr>`).join('');
  }
  await loadAppointments();

  // Add prescription
  document.getElementById('prescriptionForm').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    try {
      await apiFetch('/doctor/prescriptions', { method: 'POST', body: data });
      showAlert('Prescription added!', 'success');
      e.target.reset();
    } catch (err) {
      showAlert('Failed: ' + err.message, 'danger');
    }
  };

  // Request lab test
  document.getElementById('labTestForm').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    try {
      await apiFetch('/doctor/lab-tests', { method: 'POST', body: data });
      showAlert('Lab test requested!', 'success');
      e.target.reset();
    } catch (err) {
      showAlert('Failed: ' + err.message, 'danger');
    }
  };

  // Request radiology test
  document.getElementById('radiologyTestForm').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    try {
      await apiFetch('/doctor/radiology-tests', { method: 'POST', body: data });
      showAlert('Radiology test requested!', 'success');
      e.target.reset();
    } catch (err) {
      showAlert('Failed: ' + err.message, 'danger');
    }
  };
});