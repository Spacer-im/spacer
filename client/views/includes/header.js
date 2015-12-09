Template.header.helpers({
    activeIfTemplateIs: function (template) {
        let currentRoute = Router.current();
        return currentRoute && currentRoute.route &&  template === currentRoute.route.getName() ? 'active' : '';
    }
});