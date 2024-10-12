import { html } from "lit";
import { AppStyledElement } from "./AppStyledElement";
import { customElement } from "lit/decorators.js";

@customElement("x-app")
export class AppElement extends AppStyledElement() {
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
            <x-theme></x-theme>
          </li>
        </ul>
        <div class="divider"></div>
        <div class="flex">
          <x-people class="w-1/3 p-4"></x-people>
          <div class="flex-1 p-4 skeleton h-96 w-80"></div>
        </div>
        <div class="divider"></div>
      </div>
    `;
  }
}
