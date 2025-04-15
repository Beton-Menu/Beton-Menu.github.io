// Общий скрипт для обеих страниц
document.addEventListener('DOMContentLoaded', function() {
    // Для страницы меню
    if (document.querySelector('.subcategory-btn')) {
        document.querySelectorAll('.main-category-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.tagName === 'BUTTON') {
                    e.preventDefault();
                    document.querySelectorAll('.main-category-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.subcategories').forEach(s => s.classList.remove('active'));
                    document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
                    
                    this.classList.add('active');
                    const category = this.dataset.category;
                    document.getElementById(`${category}-subcategories`).classList.add('active');
                    
                    const firstSubBtn = document.querySelector(`#${category}-subcategories .subcategory-btn`);
                    if (firstSubBtn) firstSubBtn.click();
                }
            });
        });

        document.querySelectorAll('.subcategory-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                const subcategory = this.dataset.subcategory;
                document.getElementById(subcategory).classList.add('active');
                
                setTimeout(() => {
                    document.getElementById(subcategory).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            });
        });

        // Активация первой категории
        if (document.querySelector('.main-category-btn.active')) {
            document.querySelector('.main-category-btn.active').click();
        }
    }
    
    // Анимация кнопок навигации (для обеих страниц)
    const navButtons = document.querySelectorAll('.main-category-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});
