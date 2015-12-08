Template.header.helpers({
    activeIfTemplateIs: function (template) {
        let currentRoute = Router.current();
        return currentRoute &&  template === currentRoute.route.getName() ? 'active' : '';
    }
});