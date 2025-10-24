document.addEventListener('DOMContentLoaded', async () => {
  // Load analytics
  async function loadAnalytics() {
    const stats = await apiFetch('/admin/analytics');
    const ul = document.getElementById('analyticsStats');
    ul.innerHTML = `
      <li>Total Appointments: ${stats.appointments}</li>
      <li>Total Lab Tests: ${stats.labTests}</li>
      <li>Total Radiology Tests: ${stats.radiologyTests}</li>
      <li>Total Billing Amount: ₹${stats.billing || 0}</li>
    `;
  }
  await loadAnalytics();

  // Departments
  async function loadDepartments() {
    const depts = await apiFetch('/admin/departments');
    document.getElementById('departmentList').innerHTML =
      depts.map(d => `<li>${d.name}</li>`).join('');
  }
  await loadDepartments();

  document.getElementById('addDeptForm').onsubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    try {
      await apiFetch('/admin/departments', { method: 'POST', body: data });
      showAlert('Department added!', 'success');
      await loadDepartments();
      e.target.reset();
    } catch (err) {
      showAlert('Failed: ' + err.message, 'danger');
    }
  };

  // Staff
  async function loadStaff() {
    const staff = await apiFetch('/admin/staff');
    document.getElementById('doctorList').innerHTML = (staff.doctors || []).map(d => `<li>${d.name}</li>`).join('');
    document.getElementById('nurseList').innerHTML = (staff.nurses || []).map(n => `<li>${n.name}</li>`).join('');
    document.getElementById('adminList').innerHTML = (staff.admins || []).map(a => `<li>${a.username}</li>`).join('');
  }
  await loadStaff();

  // Export billing as CSV
  document.getElementById('exportBilling').onclick = async e => {
    e.preventDefault();
    window.open(API_BASE + '/billing/export', '_blank');
  };
});