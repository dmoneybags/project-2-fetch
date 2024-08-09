document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {
    email: document.querySelector("#login-email").value,
    password: document.querySelector("#login-password").value,
  };

  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.href = "/home";
    } else {
      alert("Invaid usernamer and/or password");
    }
  });
});
