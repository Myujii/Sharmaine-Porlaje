document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    
    const themeBtn = document.getElementById('theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    
    const form = document.getElementById('contact-form');
    const fields = ['name', 'email', 'message'];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field);
            const errorElement = document.getElementById(`${field}-error`);
            
            if (!input.value.trim()) {
                errorElement.style.display = 'block';
                isValid = false;
            } else if (field === 'email' && !validateEmail(input.value)) {
                errorElement.innerText = "Please enter a valid email address.";
                errorElement.style.display = 'block';
                isValid = false;
            } else {
                errorElement.style.display = 'none';
            }
        });

        if (isValid) {
            document.getElementById('form-success').style.display = 'block';
            form.reset();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
