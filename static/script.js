
        // Управление шапкой
       /*/let lastScroll = 0;
        const header = document.getElementById('main-header');
        const headerHeight = header.offsetHeight;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > headerHeight) {
                // Прокрутка вниз - скрываем шапку
                header.classList.add('hidden');
            } else {
                // Прокрутка вверх - показываем шапку
                header.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });/*/

        // Переключение категорий
        document.querySelectorAll('.main-category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.main-category-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.subcategories').forEach(s => s.classList.remove('active'));
                document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                const category = this.dataset.category;
                document.getElementById(`${category}-subcategories`).classList.add('active');
                
                const firstSubBtn = document.querySelector(`#${category}-subcategories .subcategory-btn`);
                if (firstSubBtn) firstSubBtn.click();
                
                // Показываем шапку при переключении
                header.classList.remove('hidden');
            });
        });

        // Переключение подкатегорий
        document.querySelectorAll('.subcategory-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                const subcategory = this.dataset.subcategory;
                document.getElementById(subcategory).classList.add('active');
                
                // Плавная прокрутка к секции
                setTimeout(() => {
                    document.getElementById(subcategory).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            });
        });

        // Активация первой категории
        document.querySelector('.main-category-btn.active').click();
   
