function loadPosts(posts){
    posts.forEach((post)=>{
        const sanitizedCode=DOMPurify.sanitize(post.Code);
        const sanitizedStylesheet=DOMPurify.sanitize(post.Stylesheet);
        const containerDiv=document.createElement('div');
        containerDiv.style.position='relative';
        const styleElement=document.createElement('style');
        styleElement.textContent=sanitizedStylesheet;
        document.head.appendChild(styleElement);
        const postContentDiv=document.createElement('div');
        postContentDiv.innerHTML=sanitizedCode;
        containerDiv.appendChild(postContentDiv);
        const postResultEl=document.getElementById(`result${post["ID"]}`);
        postResultEl.innerHTML='';
        postResultEl.appendChild(containerDiv);
        postContentDiv.querySelectorAll('*').forEach(el=>{
            const computedStyle=window.getComputedStyle(el);
            if(computedStyle.position==='fixed'){
                el.style.position='absolute';
            }
        });
    });
}
const loadCreatePost = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    window.location.href = `/createPost?authorization=${token}`
};