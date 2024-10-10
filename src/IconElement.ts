import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AppStyledElement } from "./AppStyledElement";

@customElement("x-icon")
export class IconElement extends AppStyledElement() {
  @property({ type: String })
  icon: string = "";

  @property({ type: Boolean })
  filled: boolean = false;

  protected render(): unknown {
    return html`<i class="bi bi-${this.icon}${this.filled ? "-fill" : ""}"></i>`;
  }
}
