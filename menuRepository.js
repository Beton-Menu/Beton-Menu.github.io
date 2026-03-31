export class MenuRepository {
  constructor(dataUrl) {
    this.dataUrl = dataUrl;
  }

  async getMenu() {
    const response = await fetch(this.dataUrl, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Не удалось загрузить меню: ${response.status}`);
    }

    return response.json();
  }
}
