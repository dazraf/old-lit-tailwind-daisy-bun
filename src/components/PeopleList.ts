import { html, css } from "lit";
import { PersonRepository, personRepositoryContext, PersonRepositoryInMemory } from "../data/PersonRepository";
import { AppStyledElement } from "./AppStyledElement";
import { customElement, property } from "lit/decorators.js";
import { Person } from "../data/Person";
import { consume } from "@lit/context";
import { map } from "lit/directives/map.js";

@customElement("people-list")
export class PeopleList extends AppStyledElement(css``) {
  @property({ type: Object, attribute: false })
  selection: Person | null = null;

  @consume({ context: personRepositoryContext })
  private personRepository?: PersonRepository;

  protected render() {
    return html` ${map(this.personRepository?.getPeople() || [], (person) => this.renderPersonItem(person))} `;
  }

  private renderPersonItem(person: Person) {
    let bg = "bg-base-200";
    let text = "text-base-content";
    if (this.selection && this.selection.id == person.id) {
      bg = "bg-accent";
      text = "text-accent-content";
    }
    return html`
      <div
        class="card ${bg} ${text} w-95 m-4 min-h-50 p-4 border border-base-300 shadow-xl"
        @click=${(e) => this.selectPerson(e, person)}
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-4 items-center">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img src="https://i.pravatar.cc/300/?u=${person.email}" />
              </div>
            </div>
            <h2 class="font-semibold">${person.firstName} ${person.lastName}</h2>
          </div>
          <div>
            <hr />
            <table class="font-mono text-sm m-2">
              <tr>
                <td>#</td>
                <td>${person.id}</td>
              </tr>
              <tr>
                <td>b:</td>
                <td>${this.getDoB(person)}</td>
              </tr>
              <tr>
                <td>e:</td>
                <td>${person.email}</td>
              </tr>
              <tr>
                <td>m:</td>
                <td>${person.mobile}</td>
              </tr>
              <tr>
                <td>a:</td>
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
