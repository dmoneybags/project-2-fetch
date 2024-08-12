const login = () => {
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    const email = emailEl.value;
    const password = passwordEl.value;
    fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'email': email,
            'password': password
        }),
    })
    .then(async (res) => {
        if (res.ok){
            console.log("Server said login was successful!");
            const resData = await res.json();
            console.log(resData);
            const user = resData["user"];
            const token = resData["token"];
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            console.log("redirecting...");
            window.location.href = `myAccount?authorization=${token}`
        } else {
            showError("Invalid Username or Password!");
        }
    })
    .catch((err)=>{
        console.log(err);
        showError("Couldn't login");
    })
}
const loginBtn = document.getElementById("submitLogin");
loginBtn.addEventListener("click", login);