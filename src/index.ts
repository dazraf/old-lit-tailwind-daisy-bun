// add all your custom elements here
import "./components/Icon";
import "./components/Application";
import "./components/PeopleList";
import "./components/ThemeSelector";
import "./components/PersonEditor";
import "./components/Breadcrumbs";

// Conditional ESM module loading (Node.js and browser)
// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import("urlpattern-polyfill");
}
