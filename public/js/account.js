let isFollowing = '';
const unfollow = () => {
    const token = localStorage.getItem("token");
    fetch("/api/db/removeFollower", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
        body: JSON.stringify({followingId: followingId}),
    })
    .then((response) => {
        if (response.ok){
            isFollowing = isFollowingValue;
            const followingBtnEl = document.getElementById("followBtn");
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
    fetch("/api/db/addFollower", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
        body: JSON.stringify({followingId: followingId}),
    })
    .then((response) => {
        if (response.ok){
            isFollowing = isFollowingValue;
            const followingBtnEl = document.getElementById("followBtn");
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
followingBtnEl.addEventListener('click', () => {
    setIsFollowing();
})