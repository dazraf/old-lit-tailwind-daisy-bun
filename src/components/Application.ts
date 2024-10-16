import { html } from "lit";
import { AppStyledElement } from "./AppStyledElement";
import { customElement, property } from "lit/decorators.js";
import { Person } from "../data/Person";
import { when } from "lit/directives/when.js";
import { provide } from "@lit/context";
import { personRepositoryContext, PersonRepositoryInMemory } from "../data/PersonRepository";

@customElement("x-app")
export class Application extends AppStyledElement() {
  @property({ type: Object }) selection: Person | undefined;
  @provide({ context: personRepositoryContext })
  personRepository = new PersonRepositoryInMemory();

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
          <people-list class="w-1/3 p-4" @changed=${this.onPersonSelected}></people-list>
          <person-editor .person=${this.selection}> </person-editor>
          <!-- <div class="flex-1 bg-base-200 p-4 h-96 w-80">
            <h1 class="text-5xl font-bold">
              ${when(
            this.selection,
            () => html` ${this.selection?.firstName} ${this.selection?.lastName} `,
            () => html``
          )}
            </h1>
          </div> -->
        </div>

        <div class="divider"></div>
      </div>
    `;
  }

  private onPersonSelected(e: CustomEvent) {
    this.selection = e.detail.person;
    this.requestUpdate();
  }
}
