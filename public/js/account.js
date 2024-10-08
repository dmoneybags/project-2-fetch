let isFollowing = '';
const unfollow = () => {
    const token = localStorage.getItem("token");
    const followingBtnEl = document.getElementById("followBtn");
    const followingId = followingBtnEl.dataset.id;
    fetch(`/api/db/removeFollower?authorization=${token}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({followingId: followingId}),
    })
    .then((response) => {
        if (response.ok){
            isFollowing = false;
            followingBtnEl.textContent = "Follow";
            showSuccess("Unfollowed!");
        } else {
            showError("Couldn't unfollow!");
        }
        //show success, write follow side and then add likes. We still need to test create post, and
        //do sign up page and login page
    })
    .catch((err) => {
        showError("Couldn't unfollow!");
        console.error(err);
    })
}
const follow = () => {
    const token = localStorage.getItem("token");
    const followingBtnEl = document.getElementById("followBtn");
    const followingId = followingBtnEl.dataset.id;
    fetch(`/api/db/addFollower?authorization=${token}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({followingId: followingId}),
    })
    .then((response) => {
        if (response.ok){
            isFollowing = true;
            followingBtnEl.textContent = "Unfollow";
            showSuccess("Followed!");
        } else {
            showError("Couldn't follow!");
        }
    })
    .catch((err) => {
        showError("Couldn't follow!");
        console.error(err);
    })
}
const setIsFollowing = () => {
    if (isFollowing){
        unfollow();
    } else {
        follow();
    }
}
function showSuccess(text) {
    const notification = document.createElement('div');
    notification.className = 'notification is-success sticky-notification';
    notification.textContent = text;
    
    document.body.prepend(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
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
const followingBtnEl = document.getElementById("followBtn");
if (followingBtnEl){
    followingBtnEl.addEventListener('click', () => {
        setIsFollowing();
    })
}
function logOut(event) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = `/`
}
function deletePost(event, id){
    const token = localStorage.getItem("token");
    console.log(event);
    event.stopPropagation();
    event.preventDefault();
    console.log("Deleting post");
    fetch(`/api/db/deletePost?authorization=${token}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id}),
    })
    .then(() => {
        console.log("Reloading page");
        location.reload();
        return false;
    })
    .catch((err) => {
        showError(err);
    })
}
const deleteButtons = document.querySelectorAll('.deleteBtn');

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {deletePost(event, button.dataset.id)});
});