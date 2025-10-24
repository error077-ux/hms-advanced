const API_BASE = "http://localhost:3001/api";

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  options.headers = options.headers || {};
  if (token) options.headers['Authorization'] = 'Bearer ' + token;
  if (options.body && !(options.body instanceof FormData)) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }
  const resp = await fetch(API_BASE + path, options);
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}