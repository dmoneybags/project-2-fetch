const reloadWithToken = () => {
    const token = localStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);

    if (token && !urlParams.has("authorization")) {
        const fragment = window.location.hash;
        const newUrl = window.location.pathname + `?authorization=${token}` + fragment;
        window.location.href = newUrl;
    }
};
reloadWithToken();