# Svelte custom elements starter project
Svelte 4 supports [custom elements](https://svelte.dev/docs/custom-elements-api) but there are a few tricky bits that can make life a little difficult 😠. This project shows some solutions to common problems.

## Problem 1: Components ignore global css
Custom elements can be used with or without the shadow dom. With the shadow dom, components are isolated and cannot by styled from the page's css. Without the shadow dom, components cannot use slots, a very important feature that you likely depend on.

One solution is to use `<link>` tags within your component but this results in a [flash of unstyled content](https://dev.to/emileperron/web-components-in-2021-the-good-the-bad-and-the-ugly-3kg)

The solution is to use [constructable stylesheets](https://web.dev/constructable-stylesheets/) and attached them to the shadowRoot of the element. Now, you get the best of both worlds - global styles and slots.

## Problem 2: Too much boilerplate 
The official svelte docs recommend you place the following in your main.js / main.ts:
```js
import MyElement from './MyElement.svelte';
customElements.define('my-element', MyElement.element);
```

What if you have lots and lots of components? You would have to repeat this many times. Probably not a massive issue but we can do better. If you are using Vite, use its glob import feature to remove the repetition:
```js
const modules = import.meta.glob('./lib/**/*.svelte', {eager: true})
for (const path in modules) {
    const mod = modules[path] as SvelteModule
    const el = mod.default.element

    // Determine component name from file name.
    const filename = path.split('/').pop()
    const componentName = filename.slice(0,-7)

    // Register custom element.
    customElements.define(`${prefix}-${componentName}`, el)
}
```
