const reloadWithToken = () => {
    const token = localStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);

    if (token && !urlParams.has("authorization")) {
        window.location.href = window.location.pathname + `?authorization=${token}`;
    }
};
reloadWithToken();