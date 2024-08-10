const crud = require("../db/CRUDoperations");

const mockPosts = [
    {
        UserID: 1,
        Title: 'Cool Button Animation',
        Description: 'A button with a cool hover animation.',
        Code: `
            <button class="animated-button">Click Me!</button>
        `,
        Stylesheet: `
            .animated-button {
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.3s ease;
            }
            .animated-button:hover {
                background-color: #0056b3;
                transform: scale(1.1);
            }
        `
    },
    {
        UserID: 2,
        Title: 'Bouncing Ball',
        Description: 'A simple bouncing ball animation.',
        Code: `
            <div class="bouncing-ball"></div>
        `,
        Stylesheet: `
            .bouncing-ball {
                width: 50px;
                height: 50px;
                background-color: #ff5722;
                border-radius: 50%;
                position: relative;
                animation: bounce 2s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-150px);
                }
                60% {
                    transform: translateY(-75px);
                }
            }
        `
    },
    {
        UserID: 3,
        Title: 'Responsive Card Layout',
        Description: 'A card layout that adapts to different screen sizes.',
        Code: `
            <div class="card">
                <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="card-img">
                <div class="card-body">
                    <h3 class="card-title">Card Title</h3>
                    <p class="card-text">This is a card with some text content.</p>
                </div>
            </div>
        `,
        Stylesheet: `
            .card {
                width: 300px;
                border: 1px solid #ddd;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
            }
            .card:hover {
                transform: scale(1.05);
            }
            .card-img {
                width: 100%;
                height: 150px;
                object-fit: cover;
            }
            .card-body {
                padding: 16px;
            }
            .card-title {
                margin: 0;
                font-size: 18px;
                font-weight: bold;
            }
            .card-text {
                margin: 8px 0 0;
                color: #555;
            }
        `
    },
    {
        UserID: 4,
        Title: 'Image Gallery Grid',
        Description: 'A simple grid layout for displaying images.',
        Code: `
            <div class="gallery">
                <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="gallery-item">
                <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="gallery-item">
                <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="gallery-item">
                <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="gallery-item">
            </div>
        `,
        Stylesheet: `
            .gallery {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 10px;
            }
            .gallery-item {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
                transition: transform 0.3s ease;
            }
            .gallery-item:hover {
                transform: scale(1.05);
            }
        `
    },
    {
        UserID: 5,
        Title: 'Typing Text Effect',
        Description: 'A text element with a typing animation effect.',
        Code: `
            <div class="typing-text">This is a typing effect.</div>
        `,
        Stylesheet: `
            .typing-text {
                font-family: 'Courier New', monospace;
                font-size: 24px;
                border-right: 2px solid #000;
                white-space: nowrap;
                overflow: hidden;
                animation: typing 4s steps(40, end) infinite, blink-caret .75s step-end infinite;
            }
            @keyframes typing {
                from { width: 0; }
                to { width: 100%; }
            }
            @keyframes blink-caret {
                from, to { border-color: transparent; }
                50% { border-color: black; }
            }
        `
    },
    {
        UserID: 6,
        Title: 'Hover Glow Effect',
        Description: 'A glow effect on hover for text elements.',
        Code: `
            <div class="glow-text">Hover over me!</div>
        `,
        Stylesheet: `
            .glow-text {
                font-size: 24px;
                color: #333;
                text-align: center;
                transition: text-shadow 0.3s ease;
            }
            .glow-text:hover {
                text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
            }
        `
    },
    {
        UserID: 7,
        Title: 'Floating Button',
        Description: 'A button that floats and bounces gently.',
        Code: `
            <button class="floating-button">Float!</button>
        `,
        Stylesheet: `
            .floating-button {
                padding: 15px 30px;
                font-size: 16px;
                color: #fff;
                background-color: #28a745;
                border: none;
                border-radius: 50px;
                position: fixed;
                bottom: 20px;
                right: 20px;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                animation: float 3s ease-in-out infinite;
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `
    },
    {
        UserID: 8,
        Title: 'Gradient Background',
        Description: 'A gradient background effect for a section.',
        Code: `
            <section class="gradient-background">This section has a gradient background.</section>
        `,
        Stylesheet: `
            .gradient-background {
                height: 200px;
                background: linear-gradient(45deg, #f06, #ff9);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 24px;
                border-radius: 10px;
                padding: 20px;
            }
        `
    },
    {
        UserID: 9,
        Title: 'Rotating Cube',
        Description: 'A 3D rotating cube animation.',
        Code: `
            <div class="cube"></div>
        `,
        Stylesheet: `
            .cube {
                width: 100px;
                height: 100px;
                background-color: #ff5722;
                transform-style: preserve-3d;
                animation: rotate 5s infinite linear;
                position: relative;
            }
            .cube::before, .cube::after, .cube div {
                content: '';
                position: absolute;
                width: 100px;
                height: 100px;
                background-color: inherit;
                border: 1px solid rgba(0, 0, 0, 0.2);
            }
            .cube::before {
                transform: rotateY(90deg);
            }
            .cube::after {
                transform: rotateX(90deg);
            }
            @keyframes rotate {
                from { transform: rotateX(0) rotateY(0); }
                to { transform: rotateX(360deg) rotateY(360deg); }
            }
        `
    },
    {
        UserID: 10,
        Title: 'Loading Spinner',
        Description: 'A simple loading spinner animation.',
        Code: `
            <div class="spinner"></div>
        `,
        Stylesheet: `
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-left: 4px solid #007bff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `
    },
    {
        UserID: 11,
        Title: 'Sliding Menu',
        Description: 'A sliding side menu effect.',
        Code: `
            <div class="side-menu">
                <button class="menu-toggle">☰</button>
                <nav class="menu">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Contact</a>
                </nav>
            </div>
        `,
        Stylesheet: `
            .side-menu {
                position: relative;
            }
            .menu-toggle {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 10px;
                cursor: pointer;
                font-size: 24px;
                position: absolute;
                top: 10px;
                left: 10px;
                z-index: 1;
            }
            .menu {
                position: fixed;
                top: 0;
                left: -250px;
                width: 250px;
                height: 100%;
                background-color: #333;
                color: #fff;
                transition: left 0.3s ease;
                display: flex;
                flex-direction: column;
                padding-top: 60px;
                z-index: 0;
            }
            .menu a {
                color: #fff;
                text-decoration: none;
                padding: 15px;
                display: block;
                transition: background-color 0.2s ease;
            }
            .menu a:hover {
                background-color: #575757;
            }
            .menu-toggle.active + .menu {
                left: 0;
            }
        `
    },
    {
        UserID: 12,
        Title: 'Fading Text',
        Description: 'Text that fades in and out.',
        Code: `
            <div class="fading-text">Fading Text Example</div>
        `,
        Stylesheet: `
            .fading-text {
                font-size: 24px;
                animation: fade 3s infinite;
            }
            @keyframes fade {
                0%, 100% { opacity: 0; }
                50% { opacity: 1; }
            }
        `
    },
    {
        UserID: 13,
        Title: 'Image Hover Zoom',
        Description: 'An image that zooms in on hover.',
        Code: `
            <div class="zoom-container">
                <img src="https://via.placeholder.com/300" alt="Placeholder Image" class="zoom-image">
            </div>
        `,
        Stylesheet: `
            .zoom-container {
                overflow: hidden;
                width: 300px;
                height: 200px;
                border-radius: 8px;
            }
            .zoom-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            .zoom-container:hover .zoom-image {
                transform: scale(1.2);
            }
        `
    },
    {
        UserID: 14,
        Title: 'Accordion Menu',
        Description: 'A collapsible accordion menu.',
        Code: `
            <div class="accordion">
                <div class="accordion-item">
                    <button class="accordion-toggle">Section 1</button>
                    <div class="accordion-content">
                        <p>Content for section 1.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <button class="accordion-toggle">Section 2</button>
                    <div class="accordion-content">
                        <p>Content for section 2.</p>
                    </div>
                </div>
            </div>
        `,
        Stylesheet: `
            .accordion-item {
                border-bottom: 1px solid #ddd;
            }
            .accordion-toggle {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 15px;
                text-align: left;
                cursor: pointer;
                font-size: 16px;
                width: 100%;
                border-radius: 5px;
            }
            .accordion-content {
                display: none;
                padding: 15px;
                background-color: #f9f9f9;
            }
            .accordion-toggle.active + .accordion-content {
                display: block;
            }
        `
    },
    {
        UserID: 15,
        Title: 'Loading Dots',
        Description: 'A loading animation with bouncing dots.',
        Code: `
            <div class="loading-dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
        `,
        Stylesheet: `
            .loading-dots {
                display: flex;
                justify-content: space-around;
                width: 60px;
            }
            .loading-dots div {
                width: 10px;
                height: 10px;
                background-color: #007bff;
                border-radius: 50%;
                animation: bounce 1.5s infinite;
            }
            .loading-dots div:nth-child(2) {
                animation-delay: 0.3s;
            }
            .loading-dots div:nth-child(3) {
                animation-delay: 0.6s;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: scale(0);
                }
                50% {
                    transform: scale(1);
                }
            }
        `
    },
    {
        UserID: 16,
        Title: 'Circular Progress Bar',
        Description: 'A circular progress bar with animated filling.',
        Code: `
            <div class="progress-ring">
                <svg width="100" height="100">
                    <circle class="progress-ring__circle" stroke="#007bff" stroke-width="4" fill="transparent" r="45" cx="50" cy="50"/>
                </svg>
            </div>
        `,
        Stylesheet: `
            .progress-ring {
                position: relative;
                width: 100px;
                height: 100px;
            }
            .progress-ring__circle {
                transition: stroke-dashoffset 0.35s;
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
                stroke-dasharray: 282.6; /* 2 * π * radius */
                stroke-dashoffset: 0;
            }
            /* Animate progress */
            .progress-ring__circle {
                stroke-dashoffset: 70; /* Example value for demonstration */
            }
        `
    },
    {
        UserID: 17,
        Title: 'Parallax Scrolling Effect',
        Description: 'A simple parallax effect for scrolling.',
        Code: `
            <div class="parallax">
                <div class="content">
                    <h2>Parallax Scrolling</h2>
                    <p>Scroll to see the effect.</p>
                </div>
            </div>
        `,
        Stylesheet: `
            .parallax {
                background-image: url('https://via.placeholder.com/1200x600');
                height: 500px;
                background-attachment: fixed;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }
            .content {
                text-align: center;
                padding: 50px;
                color: #fff;
            }
        `
    },
    {
        UserID: 18,
        Title: 'Floating Labels',
        Description: 'Input fields with floating labels.',
        Code: `
            <div class="form-group">
                <input type="text" id="name" class="form-control">
                <label for="name" class="form-label">Name</label>
            </div>
        `,
        Stylesheet: `
            .form-group {
                position: relative;
                margin: 20px 0;
            }
            .form-control {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 16px;
                background-color: #fff;
                transition: border-color 0.3s ease;
            }
            .form-control:focus {
                border-color: #007bff;
                outline: none;
            }
            .form-label {
                position: absolute;
                top: 12px;
                left: 10px;
                font-size: 16px;
                color: #aaa;
                transition: 0.3s ease;
                pointer-events: none;
            }
            .form-control:focus + .form-label,
            .form-control:not(:placeholder-shown) + .form-label {
                top: -10px;
                left: 0;
                font-size: 12px;
                color: #007bff;
            }
        `
    },
    {
        UserID: 19,
        Title: 'Tilt Effect',
        Description: 'An element with a tilt effect on hover.',
        Code: `
            <div class="tilt-box">Hover me!</div>
        `,
        Stylesheet: `
            .tilt-box {
                width: 200px;
                height: 200px;
                background-color: #ff5722;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 18px;
            }
            .tilt-box:hover {
                transform: rotateX(10deg) rotateY(10deg);
            }
        `
    },
    {
        UserID: 20,
        Title: 'CSS Grid Layout',
        Description: 'A basic grid layout using CSS Grid.',
        Code: `
            <div class="grid-container">
                <div class="grid-item">Item 1</div>
                <div class="grid-item">Item 2</div>
                <div class="grid-item">Item 3</div>
                <div class="grid-item">Item 4</div>
            </div>
        `,
        Stylesheet: `
            .grid-container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            .grid-item {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
                border-radius: 8px;
                font-size: 18px;
            }
        `
    }
];
mockPosts.forEach(async (postData) => {
    const encoder = new TextEncoder();
    const codeBytes = Array.from(encoder.encode(postData["Code"]));
    console.log(codeBytes);
    postData["Code"] = codeBytes;
    const styleSheetBytes = Array.from(encoder.encode(postData["Stylesheet"]));
    console.log(styleSheetBytes);
    postData["Stylesheet"] = styleSheetBytes;
    const createdPost = await crud.createPost(postData);
})