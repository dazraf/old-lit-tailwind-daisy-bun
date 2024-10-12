import { customElement } from "lit/decorators.js";
import { AppStyledElement } from "./AppStyledElement";
import { html, css, PropertyValues } from "lit";

type ThemeName = "default" | "light" | "dark" | "cupcake" | "night";

type ThemeType = "light" | "dark" | undefined;

interface ThemeDefinition {
  title: string;
  type: ThemeType;
}

type ThemeDefinitions = {
  [K in ThemeName]: ThemeDefinition;
};

const _themes: ThemeDefinitions = {
  default: {
    title: "Default",
    type: undefined,
  },
  light: {
    title: "Light",
    type: "light",
  },
  dark: {
    title: "Dark",
    type: "dark",
  },
  cupcake: {
    title: "Cupcake",
    type: "light",
  },
  night: {
    title: "Night",
    type: "dark",
  },
};

@customElement("x-theme")
export class ThemeButton extends AppStyledElement(css``) {
  // -- static methods --

  /**
   * accessor to get current theme from storage or the browser default
   */
  static get currentTheme(): ThemeName {
    return (localStorage.getItem("theme") as ThemeName) || this.defaultTheme;
  }

  /**
   * determine if the browser default theme is either light or dark
   */
  static get defaultTheme(): ThemeName {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  }

  static get isCurrentThemeLight() {
    return _themes[this.currentTheme]?.type === "light";
  }

  // -- properties --

  /**
   * This is used to track the last selected theme. Used for cancelling a selection
   */
  private selectedTheme: string = ThemeButton.currentTheme;

  // -- overrides --

  override connectedCallback(): void {
    // this is a more robust way of capturing click events on the dropdown
    // e.g. when its embedded in a daisy menu, daisy will add a thick margin around the dropdown
    // which while visible cannot be clicked on.
    this.addEventListener("click", (e) => {
      this.openDropDown();
    });
    super.connectedCallback();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.documentTheme = ThemeButton.currentTheme;
    super.firstUpdated(_changedProperties);
  }

  protected render() {
    return html`
      <div
        class="dropdown h-max w-max p-0 m-0"
        @focusout=${this.closeDropDown}
        @focusin=${this.onDropdownFocus}
        @keydown=${this.onKey}
        tabindex="0"
      >
        <div tabindex="0" role="button" class="m-0 p-0 border-0 border-spacing-y-0 max-h-min max-w-min">
          ${ThemeButton.isCurrentThemeLight
            ? html`<x-icon icon="sun" filled></x-icon>`
            : html`<x-icon icon="moon" filled></x-icon>`}
        </div>
        <ul tabindex="0" class="dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
          ${this.renderThemes()}
        </ul>
      </div>
      <div id="focus-here" class="w-0 h-0 p-0 m-0 absolute" tabindex="1"></div>
    `;
  }

  private renderThemes() {
    return Object.entries(_themes).map(
      ([name, definition]) => html`
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label=${definition.title}
            value=${name}
            ?checked=${this.isThemeSelected(name)}
            @change=${this.onChangeTheme}
            @keydown=${this.onKey}
          />
        </li>
      `
    );
  }

  // -- event handlers --

  private onKey(e: KeyboardEvent) {
    if (e.code === "Escape" || e.code === "Enter") {
      e.preventDefault();
      if (e.code === "Escape") {
        // reset
        this.documentTheme = this.selectedTheme;
      }
      this.closeDropDown();
      this.requestUpdate();
    }
  }

  private onDropdownFocus() {
    this.selectedTheme = ThemeButton.currentTheme;
  }

  private onChangeTheme(e: Event) {
    const theme = (e.target as HTMLInputElement).value as ThemeName;
    this.documentTheme = theme;
    this.requestUpdate();
  }

  // -- private methods --

  private openDropDown() {
    const dropdown = this.renderRoot.querySelector(".dropdown") as HTMLElement;
    const content = this.renderRoot.querySelector(".dropdown-content") as HTMLElement;
    dropdown.classList.add("dropdown-open");
    content.focus();
  }

  private closeDropDown() {
    const dropdown = this.renderRoot.querySelector(".dropdown") as HTMLElement;
    dropdown.classList.remove("dropdown-open");
    const hiddenFocus = this.renderRoot.querySelector("#focus-here") as HTMLElement;
    hiddenFocus.focus();
    hiddenFocus.blur();
  }

  private isThemeSelected(theme: ThemeName) {
    return ThemeButton.currentTheme === theme;
  }

  private set documentTheme(theme: ThemeName) {
    if (theme === "default") {
      theme = ThemeButton.defaultTheme;
    }
    localStorage.setItem("theme", theme);
    this.shadowRoot?.ownerDocument.documentElement.setAttribute("data-theme", theme);
  }
}