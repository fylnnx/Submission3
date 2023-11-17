import DrawerInitiator from '../utils/drawer';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this.button = button;
    this.drawer = drawer;
    this.content = content;
    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this.button,
      drawer: this.drawer,
      content: this.content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    if (page) {
      this.content.innerHTML = await page.render();
      await page.afterRender();
      const skipcontent = document.getElementById('skip-toContent');
      const mainContent = document.getElementById('mainContent');
      skipcontent.addEventListener('click', () => {
        mainContent.scrollIntoView({ behavior: 'smooth' });
        mainContent.tabIndex = 0;
        mainContent.focus();
      });
    } else {
      this.content.innerHTML = 'Halaman tidak ditemukan';
    }
  }
}

export default App;
