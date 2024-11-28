document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const response = await fetch(`/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, password, role })
  });

  const result = await response.json();
  if (result.success) {
    if (role === 'admin') {
      window.location.href = '/admin_home.html';
    } else {
      window.location.href = '/user_home.html';
    }
  } else {
    alert(result.message);
  }
});

function togglePassword() {
  const passwordField = document.getElementById('password');
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}
