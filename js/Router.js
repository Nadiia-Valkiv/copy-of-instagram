export default class Router {
    constructor(routes) {
        this.onPopState();
        routes.forEach((route) => this.addListenersToNavPanel(route));
    }

    addListenersToNavPanel(route) {
        document
            .getElementById(`${route}Link`)
            .addEventListener('click', (e) => this.route(e, route));
    }

    route(e, path) {
        e.preventDefault();
        if (path === 'home') {
            window.history.pushState({ id: path }, null, `#/`);
        } else {
            window.history.pushState({ id: path }, null, `#/${path}`);
        }
        this.showPage(path);
    }

    showPage(id) {
        const root = document.querySelector('#root');
        const routeElements = root.querySelectorAll('div .route');
        console.log(routeElements);
        routeElements.forEach((el) => {
            if (el.id === id) {
                if (el.classList.contains('hidden')) {
                    el.classList.remove('hidden');
                }
            } else {
                if (!el.classList.contains('hidden')) {
                    el.classList.add('hidden');
                }
            }
        });
    }

    onPopState() {
        window.addEventListener('popstate', (e) => {
            if (e.state === null) {
                this.showPage('home');
            } else {
                this.showPage(evt.state.id);
            }
        });
    }
}
