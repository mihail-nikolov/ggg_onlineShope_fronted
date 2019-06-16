export default async function({ store, redirect, route }) {
    const isUserLogged = isUser(store);
    const routeIsAdminOnly = isAdminOnlyRoute(route.name);
    const userIsAdmin = isUserLogged && isAdmin(store);

    if (!isUserLogged || (routeIsAdminOnly && !userIsAdmin)) {
        return redirect("/");
    }
}

function isUser(store) {
    const auth = store.state.modules.auth;
    if (auth.token) {
        return true;
    }
    return false;
}

function isAdmin(store) {
    const user = store.state.modules.auth.userDetails;
    const mail = user.Email;
    const adminMail = "admin@admin.com";
// TODO admin
    if (mail.toLocaleLowerCase() === adminMail.toLocaleLowerCase()) {
        return true;
    }
    return false;
}

function isAdminOnlyRoute(routeName) {
    const adminOnlyRouteNames = ["my-users"];

    return adminOnlyRouteNames.includes(routeName);
}
