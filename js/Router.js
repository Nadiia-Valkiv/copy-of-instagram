import { routes } from './constants.js';

export default class Router {
    constructor() {
        this.listener('load');
        this.listener('hashchange');
    }

    resolveRoute(id) {
        const root = document.querySelector('#root');
        const routeElements = root.querySelectorAll('div .route');
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

    listener(param) {
        window.addEventListener(param, () => {
            let url = window.location.hash.slice(2) || '/';
            if (url === '/') {
                url = 'home';
            }
            if (this.isRouteValid(url)) {
                this.resolveRoute(url);
            } else {
                throw new Error(`Route ${url} not found`);
            }
        });
    }

    isRouteValid(route) {
        return routes.includes(route);
    }
}
