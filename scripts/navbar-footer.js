// Navbar and footer for each html-file

function loadNavbar() {
    const navbar = `
    <div class="container-fluid bg-dark text-white p-3">
        <nav id="dynamicNavbar" class="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
            <div class="container">
                <a class="navbar-brand" href="index.html">Carls Catstore</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="product.html">Products</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    `;
    document.getElementById("navbar-placeholder").innerHTML = navbar;
}

function loadFooter() {
    const footer = `
        <footer class="container-fluid bg-secondary text-white p-3">
            <div class="container">  
                <img src="../media/cute-sleepy-kitten.jpg" alt="Footer Cat Image" class="img-fluid">
                <p class="text-center">© 2025 CarlsCatStore - All Rights Reserved</p>
                <p class="text-center">Phone: 123-456789 <br>Email: CarlsCat@cat.com</p>
            </div>
        </footer>
    `;
    document.getElementById("footer-placeholder").innerHTML = footer;
}

document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    loadFooter();

    const currentPage = window.location.pathname;

    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        if (currentPage.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});