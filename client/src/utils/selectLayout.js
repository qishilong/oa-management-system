export function selectLayout(pathName) {
    return pathName.includes("/users") ? "LoginLayout" : "BaseLayout";
}
