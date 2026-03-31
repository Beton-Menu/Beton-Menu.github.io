import { MenuRepository } from './data/menuRepository.js';
import { MenuService } from './domain/menuService.js';
import { MenuRenderer } from './ui/menuRenderer.js';
import { MenuController } from './ui/menuController.js';

async function bootstrap() {
  const categoriesContainer = document.querySelector('[data-role="categories"]');
  const subcategoriesContainer = document.querySelector('[data-role="subcategories"]');
  const contentContainer = document.querySelector('#menu-root');
  const footerContainer = document.querySelector('[data-role="footer"]');

  const renderer = new MenuRenderer({
    categoriesContainer,
    subcategoriesContainer,
    contentContainer,
    footerContainer,
  });

  const repository = new MenuRepository('./src/data/menu-data.json');
  const service = new MenuService(repository);
  const controller = new MenuController({
    service,
    renderer,
    categoriesContainer,
    subcategoriesContainer,
  });

  try {
    await controller.init();
  } catch (error) {
    console.error(error);
    renderer.renderError(error.message || 'Не удалось инициализировать приложение.');
  }
}

bootstrap();
