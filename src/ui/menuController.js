export class MenuController {
  constructor({ service, renderer, categoriesContainer, subcategoriesContainer, contentContainer }) {
    this.service = service;
    this.renderer = renderer;
    this.categoriesContainer = categoriesContainer;
    this.subcategoriesContainer = subcategoriesContainer;
    this.contentContainer = contentContainer;
    this.state = null;
  }

  async init() {
    this.bindEvents();
    this.renderer.renderLoading();

    await this.service.initialize();
    this.state = this.service.getInitialState();
    this.render();
  }

  bindEvents() {
    this.categoriesContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-role="category"]');
      if (!button) {
        return;
      }

      this.state = this.service.changeCategory(button.dataset.id);
      this.render();
    });

    this.subcategoriesContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-role="section"]');
      if (!button) {
        return;
      }

      this.state = this.service.changeSection(button.dataset.id);
      this.render();
    });

    this.contentContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-role="group"]');
      if (!button) {
        return;
      }

      this.state = this.service.changeGroup(this.state, button.dataset.id);
      this.render();
    });
  }

  render() {
    const viewModel = this.service.buildViewModel(this.state);
    this.renderer.render(viewModel);

    const section = document.getElementById(viewModel.activeSectionId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
