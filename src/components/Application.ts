import { html } from "lit";
import { AppStyledElement } from "./AppStyledElement";
import { customElement } from "lit/decorators.js";

@customElement("x-app")
export class Application extends AppStyledElement() {
  render() {
    return html`
      <div class="container mx-auto p-8">
        <ul class="menu menu-horizontal bg-base-200 rounded-box text-sm text-center">
          <li>
            <a>
              <x-icon icon="house-door"></x-icon>
            </a>
          </li>
          <li>
            <a>
              <x-icon icon="info-circle"></x-icon>
            </a>
          </li>
          <li>
            <a>
              <x-icon icon="bar-chart" filled></x-icon>
            </a>
          </li>
          <li>
            <theme-selector></theme-selector>
          </li>
        </ul>
        <div class="divider"></div>
        <div class="flex">
          <people-list class="w-1/3 p-4"></people-list>
          <div class="flex-1 p-4 skeleton h-96 w-80"></div>
        </div>
        <div class="divider"></div>
      </div>
    `;
  }
}
