export class MenuService {
  constructor(repository) {
    this.repository = repository;
    this.menu = null;
    this.categoryMap = new Map();
    this.sectionMap = new Map();
    this.sectionToCategoryMap = new Map();
  }

  async initialize() {
    this.menu = await this.repository.getMenu();
    this.validateMenu(this.menu);
    this.createIndexes();
    return this.menu;
  }

  validateMenu(menu) {
    if (!menu || !Array.isArray(menu.categories) || menu.categories.length === 0) {
      throw new Error('В источнике данных нет категорий меню.');
    }

    for (const category of menu.categories) {
      if (!category.id || !Array.isArray(category.sections) || category.sections.length === 0) {
        throw new Error(`Категория "${category?.label ?? category?.id ?? 'unknown'}" заполнена некорректно.`);
      }
    }
  }

  createIndexes() {
    this.categoryMap.clear();
    this.sectionMap.clear();
    this.sectionToCategoryMap.clear();

    for (const category of this.menu.categories) {
      this.categoryMap.set(category.id, category);

      for (const section of category.sections) {
        this.sectionMap.set(section.id, section);
        this.sectionToCategoryMap.set(section.id, category.id);
      }
    }
  }

  getVenue() {
    return this.menu.venue;
  }

  getCategories() {
    return this.menu.categories.map(({ id, label }) => ({ id, label }));
  }

  getSectionsForCategory(categoryId) {
    return this.getCategory(categoryId).sections.map(({ id, label }) => ({ id, label }));
  }

  getCategory(categoryId) {
    const category = this.categoryMap.get(categoryId);

    if (!category) {
      throw new Error(`Категория "${categoryId}" не найдена.`);
    }

    return category;
  }

  getSection(sectionId) {
    const section = this.sectionMap.get(sectionId);

    if (!section) {
      throw new Error(`Раздел "${sectionId}" не найден.`);
    }

    return section;
  }

  getInitialState() {
    const firstCategory = this.menu.categories[0];
    const firstSection = firstCategory.sections[0];

    return {
      activeCategoryId: firstCategory.id,
      activeSectionId: firstSection.id,
    };
  }

  changeCategory(categoryId) {
    const category = this.getCategory(categoryId);

    return {
      activeCategoryId: category.id,
      activeSectionId: category.sections[0].id,
    };
  }

  changeSection(sectionId) {
    const categoryId = this.sectionToCategoryMap.get(sectionId);

    if (!categoryId) {
      throw new Error(`Раздел "${sectionId}" не привязан ни к одной категории.`);
    }

    return {
      activeCategoryId: categoryId,
      activeSectionId: sectionId,
    };
  }

  buildViewModel(state) {
    const activeCategory = this.getCategory(state.activeCategoryId);
    const activeSection = this.getSection(state.activeSectionId);

    return {
      venue: this.getVenue(),
      categories: this.getCategories(),
      sections: this.getSectionsForCategory(activeCategory.id),
      activeCategoryId: activeCategory.id,
      activeSectionId: activeSection.id,
      activeSection,
    };
  }
}
