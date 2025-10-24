document.addEventListener('DOMContentLoaded', async () => {
  // Load radiology tests
  async function loadRadiologyTests() {
    const tests = await apiFetch('/radiology/');
    const table = document.getElementById('radiologyTestsTable');
    table.innerHTML = `<tr>
      <th>ID</th><th>Appointment</th><th>Patient</th><th>Doctor</th>
      <th>Scan Type</th><th>Status</th><th>Result</th><th>Report</th>
    </tr>` + tests.map(t => `<tr>
      <td>${t.id}</td>
      <td>${t.appointment_id}</td>
      <td>${t.patient_name}</td>
      <td>${t.doctor_name}</td>
      <td>${t.scan_type}</td>
      <td>${t.status}</td>
      <td>${t.result || ''}</td>
      <td>${t.report_file ? `<a href="/uploads/${t.report_file}" target="_blank">View</a>` : ''}</td>
    </tr>`).join('');
  }
  await loadRadiologyTests();

  // Mark as completed
  document.getElementById('resultForm').onsubmit = async e => {
    e.preventDefault();
    const test_id = e.target.test_id.value;
    const result = e.target.result.value;
    try {
      await apiFetch(`/radiology/${test_id}/result`, { method: 'PATCH', body: { result } });
      showAlert('Result updated!', 'success');
      await loadRadiologyTests();
      e.target.reset();
    } catch (err) {
      showAlert('Failed: ' + err.message, 'danger');
    }
  };

  // Upload report file
  document.getElementById('reportForm').onsubmit = async e => {
    e.preventDefault();
    const test_id = e.target.test_id.value;
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    try {
      await fetch(API_BASE + `/radiology/${test_id}/report`, {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': 'Bearer ' + getToken() }
      });
      showAlert('Report uploaded!', 'success');
      await loadRadiologyTests();
      e.target.reset();
    } catch (err) {
      showAlert('Failed: ' + err.message, 'danger');
    }
  };
});