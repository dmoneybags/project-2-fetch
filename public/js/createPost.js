const createPost = (event) => {
    console.log("Creating post");
    event.preventDefault();
    const titleEl = document.getElementById("title-input");
    const descriptionEl = document.getElementById("description-input");
    const cssEl = document.getElementById("css-input");
    const htmlEl = document.getElementById("html-input");
    console.log(titleEl.value);
    console.log(descriptionEl.value);
    console.log(htmlEl.value);
    if (
        (titleEl.value === "") ||
        (descriptionEl.value === "") ||
        (htmlEl.value === "")
    ){
        console.log("empty clause failed");
        showError("Title, description, and html all need to be filled");
        return;
    }
    const post = {
        Title: titleEl.value,
        Description: descriptionEl.value,
        Code: htmlEl.value,
        Stylesheet: cssEl.value
    }
    const token = localStorage.getItem("token");
    fetch("/api/db/createPost", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
        body: JSON.stringify({post: post}),
    })
    .then((response) => {
        if (response.ok) {
            //will change to grab userId from localstorage
            window.location.href = '/user/id';
        } else {
            showError('Could not create post!');
        }
    })
    .catch(() => {
        showError('Could not create post!');
    })

}
function showError(text) {
    const notification = document.createElement('div');
    notification.className = 'notification is-danger sticky-notification';
    notification.textContent = text;
    
    document.body.prepend(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}