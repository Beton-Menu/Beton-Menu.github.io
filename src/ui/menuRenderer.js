function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderButton({ id, label, role, activeId, className }) {
  const isActive = id === activeId;

  return `
    <button
      class="${className}${isActive ? ' active' : ''}"
      data-role="${role}"
      data-id="${escapeHtml(id)}"
      type="button"
      aria-pressed="${isActive}"
    >
      ${escapeHtml(label)}
    </button>
  `;
}

function renderItem(item) {
  return `
    <article class="menu-item">
      <span class="menu-item__name">${escapeHtml(item.name)}</span>
      ${item.weight ? `<span class="menu-item__weight">${escapeHtml(item.weight)}</span>` : '<span></span>'}
      ${item.price ? `<span class="menu-item__price">${escapeHtml(item.price)}</span>` : '<span></span>'}
    </article>
  `;
}

function renderGroupItems(group) {
  return `
    <section class="menu-group">
      ${group.title ? `<h3 class="group-title">${escapeHtml(group.title)}</h3>` : ''}
      ${group.items.map(renderItem).join('')}
    </section>
  `;
}

function renderGroupsFirstSection(section, selectedGroup, activeGroupId) {
  return `
    <section class="menu-section" id="${escapeHtml(section.id)}">
      <h2 class="section-title">${escapeHtml(section.title)}</h2>
      ${section.subtitle ? `<p class="section-subtitle">${escapeHtml(section.subtitle)}</p>` : ''}
      <div class="menu-group-nav" aria-label="Группы раздела">
        ${section.groups
          .map((group) =>
            renderButton({
              id: group.id,
              label: group.label,
              role: 'group',
              activeId: activeGroupId,
              className: 'subcategory-btn menu-group-nav__button',
            }),
          )
          .join('')}
      </div>
      ${
        selectedGroup
          ? `
            <section class="menu-group menu-group--selected" data-role="group-content">
              <h3 class="group-title">${escapeHtml(selectedGroup.title)}</h3>
              ${selectedGroup.items.map(renderItem).join('')}
            </section>
          `
          : `
            <section class="card screen-message screen-message--hint">
              <p>${escapeHtml(section.groupSelectionHint)}</p>
            </section>
          `
      }
    </section>
  `;
}

function renderSection(section, selectedGroup, activeGroupId) {
  if (section.navigationMode === 'groups-first') {
    return renderGroupsFirstSection(section, selectedGroup, activeGroupId);
  }

  return `
    <section class="menu-section" id="${escapeHtml(section.id)}">
      <h2 class="section-title">${escapeHtml(section.title)}</h2>
      ${section.subtitle ? `<p class="section-subtitle">${escapeHtml(section.subtitle)}</p>` : ''}
      ${section.groups.map(renderGroupItems).join('')}
    </section>
  `;
}

export class MenuRenderer {
  constructor({ categoriesContainer, subcategoriesContainer, contentContainer, footerContainer }) {
    this.categoriesContainer = categoriesContainer;
    this.subcategoriesContainer = subcategoriesContainer;
    this.contentContainer = contentContainer;
    this.footerContainer = footerContainer;
  }

  render(viewModel) {
    this.categoriesContainer.innerHTML = viewModel.categories
      .map((category) =>
        renderButton({
          ...category,
          role: 'category',
          activeId: viewModel.activeCategoryId,
          className: 'main-category-btn',
        }),
      )
      .join('');

    this.subcategoriesContainer.innerHTML = viewModel.sections
      .map((section) =>
        renderButton({
          ...section,
          role: 'section',
          activeId: viewModel.activeSectionId,
          className: 'subcategory-btn',
        }),
      )
      .join('');

    this.contentContainer.innerHTML = renderSection(
      viewModel.activeSection,
      viewModel.selectedGroup,
      viewModel.activeGroupId,
    );

    this.footerContainer.innerHTML = `
      <p>${escapeHtml(viewModel.venue.address)}</p>
      <p>${escapeHtml(viewModel.venue.phone)}</p>
      <p>${escapeHtml(viewModel.venue.copyright)}</p>
    `;
  }

  renderLoading() {
    this.contentContainer.innerHTML = `
      <section class="card screen-message">
        <p>Загрузка меню…</p>
      </section>
    `;
  }

  renderError(message) {
    this.contentContainer.innerHTML = `
      <section class="card screen-message screen-message--error">
        <p>${escapeHtml(message)}</p>
      </section>
    `;
  }
}
