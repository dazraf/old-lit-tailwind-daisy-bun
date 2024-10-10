import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { AppStyledElement } from "./AppStyledElement";

/**
 * A custom element that uses Tailwind CSS styles.
 * @element x-thing
 */
@customElement("x-thing")
export class ThingElement extends AppStyledElement(css``) {
  render() {
    return html`
      <button type="button" class="btn btn-primary" tabindex="-1">
        <slot></slot>
      </button>
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn m-1">Click</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
    `;
  }
}
