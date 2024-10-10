import { customElement } from "lit/decorators.js";
import { AppStyledElement } from "./AppStyledElement";
import { html, css, PropertyValues } from "lit";

@customElement("x-theme")
export class ThemeElement extends AppStyledElement(css`
  :host {
    display: inline-block;
    height: min-content;
  }
`) {
  // accessor to get current theme from storage or default
  static get theme() {
    return localStorage.getItem("theme") || this.defaultTheme;
  }

  constructor() {
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.theme = ThemeElement.theme;
    super.firstUpdated(_changedProperties);
  }

  set theme(value: string) {
    if (value === "default") {
      value = ThemeElement.defaultTheme;
    }
    console.log("ThemeElement.set theme", value);
    localStorage.setItem("theme", value);
    this.shadowRoot?.ownerDocument.documentElement.setAttribute("data-theme", value);
  }

  static get defaultTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  }

  static get isLight() {
    return this.theme === "light" || this.defaultTheme === "light";
  }

  protected render() {
    return html`
      <div class="dropdown h-min">
        <div tabindex="0" role="button" class="btn m-1">
          ${ThemeElement.isLight
            ? html`<x-icon icon="sun" filled></x-icon>`
            : html`<x-icon icon="moon" filled></x-icon>`}

          <svg
            width="12px"
            height="12px"
            class="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul tabindex="0" class="dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Default"
              value="default"
              @change=${this.onChangeTheme}
            />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Light"
              value="light"
              @change=${this.onChangeTheme}
            />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Dark"
              value="dark"
              @change=${this.onChangeTheme}
            />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Cupcake"
              value="cupcake"
              @change=${this.onChangeTheme}
            />
          </li>
        </ul>
      </div>
    `;
  }
  private onChangeTheme(e: Event) {
    const theme = (e.target as HTMLInputElement).value;
    this.theme = theme;
    this.requestUpdate();
  }
}
