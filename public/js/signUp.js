let picture = ""

const signUp = () => {
    const usernameEl = document.getElementById("username");
    const username = usernameEl.value;
    const emailEl = document.getElementById("email");
    const email = emailEl.value;
    const passwordEl = document.getElementById("password");
    const password = passwordEl.value;
    const aboutMeEl = document.getElementById("description-input");
    const aboutMe = aboutMeEl.value;
    const confirmPasswordEl = document.getElementById("confirmPassword");
    const confirmPassword = confirmPasswordEl.value;
    if (password !== confirmPassword){
        showError("Passwords don't match!");
        return;
    }
    if (username === "" || email === "" || password === "" || picture === ""){
        showError("Need to fill out a username, email, picture, and password");
        return;
    }
    fetch("/api/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                'email': email,
                'password': password,
                "firstName": username,
		        "lastName": "_",
                "picture": picture,
                "aboutMe": aboutMe
            }
        }),
    })
    .then(async (res)=>{
        if (res.ok){
            const resData = await res.json();
            console.log(resData);
            const user = resData["user"];
            const token = resData["token"];
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = `/myAccount?authorization=${token}`;
        } else {
            const resJson = await res.json();
            showError(resJson["error"]);
        }
    })
    .catch((err) => {
        console.log(err);
        showError("Couldn't login");
    })
}
const avatarSelect = document.getElementById("avatarSelect");
const images = avatarSelect.querySelectorAll('img');
for (let image of images) {
    image.addEventListener("click", () => {
        console.log("Clicked");
        for (let image of images){
            image.style.boxShadow = null;
        }
        image.style.boxShadow = "0 24px 48px rgba(0, 4, 237, 0.56)";
        picture = image.dataset.name;
        console.log(picture);
    });
}
const signUpBtn = document.getElementById("signUpSubmit");
signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    signUp();
})