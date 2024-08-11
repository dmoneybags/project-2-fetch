const loadMyAccount = (event) => {
    event.preventDefault(); // Prevents the default action

    const token = localStorage.getItem("token");
    window.location.href = `/myAccount?authorization=${token}`
};
const loadFollowing = (event) => {
    event.preventDefault(); // Prevents the default action

    const token = localStorage.getItem("token");
    window.location.href = `/following?authorization=${token}`
};