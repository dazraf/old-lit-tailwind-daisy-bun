import { html, css } from "lit";
import { PersonRepository, personRepositoryContext, PersonRepositoryInMemory } from "../data/PersonRepository";
import { AppStyledElement } from "./AppStyledElement";
import { customElement, property } from "lit/decorators.js";
import { Person } from "../data/Person";
import { consume } from "@lit/context";
import { map } from "lit/directives/map.js";

@customElement("people-list")
export class PeopleList extends AppStyledElement(css`
  :host {
    width: 100%;
  }
`) {
  @property({ type: Object, attribute: false })
  selection: Person | null = null;

  @consume({ context: personRepositoryContext })
  private personRepository?: PersonRepository;

  protected render() {
    return html`
      <div class="flex flex-wrap w-full ">
        ${map(this.personRepository?.getPeople() || [], (person) => this.renderPersonItem(person))}
      </div>
    `;
  }

  private renderPersonItem(person: Person) {
    let bgColor = "bg-base-200";
    let textColor = "text-base-content";
    let divider = "";

    if (this.selection && this.selection.id == person.id) {
      bgColor = "bg-accent";
      textColor = "text-accent-content";
      divider = "divider-content-accent";
    }
    return html`
      <div
        class="card ${bgColor} ${textColor} max-w-72 min-w-72 m-4 min-h-50 p-4 border border-base-300 shadow-xl"
        @click=${(e: Event) => this.selectPerson(e, person)}
      >
        <div class="flex flex-col gap-4 cursor-pointer">
          <div class="flex flex-row gap-4 items-center">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img src="https://i.pravatar.cc/300/?u=${person.email}" />
              </div>
            </div>
            <h2 class="font-semibold">${person.firstName} ${person.lastName}</h2>
          </div>
          <div>
            <table class="font-sans text-sm m-2">
              <thead>
                <tr>
                  <th class="w-6 text-left"></th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tr>
                <td><b-icon icon="calendar3-event"></b-icon></td>
                <td>${this.getDoB(person)}</td>
              </tr>
              <tr>
                <td><b-icon icon="envelope-at"></b-icon></td>
                <td>${person.email}</td>
              </tr>
              <tr>
                <td><b-icon icon="phone"></b-icon></td>
                <td>${person.mobile}</td>
              </tr>
              <tr>
                <td><b-icon icon="geo-alt"></b-icon></td>
                <td>${person.address}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  getDoB(person: Person) {
    return person.dateOfBirth.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  selectPerson(event: Event, person: Person) {
    event.preventDefault();
    if (this.selection === person) {
      this.selection = null;
    } else {
      this.selection = person;
    }
    this.dispatchEvent(
      new CustomEvent("changed", { bubbles: true, composed: true, detail: { person: this.selection } })
    );
  }
}
