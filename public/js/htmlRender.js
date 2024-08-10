function loadPosts(posts){
    posts.forEach((post) => {
        const sanitizedCode = DOMPurify.sanitize(post.Code);
        const sanitizedStylesheet = DOMPurify.sanitize(post.Stylesheet);
        const styleElement = document.createElement('style');
        styleElement.textContent = sanitizedStylesheet;
        document.head.appendChild(styleElement);
        const postResultEl = document.getElementById(`result${post["ID"]}`);
        postResultEl.innerHTML = sanitizedCode;
    })
}