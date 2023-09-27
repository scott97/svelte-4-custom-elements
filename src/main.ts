import css from './app.css?inline' // Vite can import CSS as a string by using ?inline

type SvelteModule = { default: {element: CustomElementConstructor} }

/** Registers all custom elements ready to use in the webpage. */
export function useCustomElements(prefix: string) {

  // Create stylesheet shared by all elements.
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
 
  // Load modules.
  const modules = import.meta.glob('./lib/**/*.svelte', {eager: true})
  for (const path in modules) {
    const mod = modules[path] as SvelteModule
    
    // Determine component name from file name.
    const filename = path.split('/').pop()
    const componentName = filename.slice(0,-7)
    
    // Attach global styles.
    const el = class extends mod.default.element {
      constructor() {
        super()
        this.shadowRoot.adoptedStyleSheets = [sheet]
      }
    }

    // Register custom element.
    customElements.define(`${prefix}-${componentName}`, el)
  }
}

