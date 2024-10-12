import { html } from "lit";
import { PersonRepository, PersonRepositoryInMemory } from "../data/PersonRepository";
import { AppStyledElement } from "./AppStyledElement";
import { customElement } from "lit/decorators.js";
import { Person } from "../data/Person";

@customElement("x-people")
export class PeopleList extends AppStyledElement() {
  personRepository: PersonRepository;
  selection: Person | null = null;

  constructor() {
    super();
    this.personRepository = new PersonRepositoryInMemory();
  }

  protected render() {
    return html`
      <div class="overflow-x-auto w-min rounded-md">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            ${this.personRepository.getPeople().map((person) => this.renderPersonItem(person))}
          </tbody>
        </table>
      </div>
    `;
  }

  private renderPersonItem(person: Person) {
    return html`
      <tr
        class="hover ${this.selection && this.selection.id == person.id ? "bg-base-300" : ""}"
        @click=${(e: MouseEvent) => this.selectPerson(e, person)}
      >
        <th>${person.id}</th>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
      </tr>
    `;
  }

  selectPerson(event: Event, person: Person) {
    event.preventDefault();
    this.selection = person;
    this.requestUpdate();
    console.log("selectPerson", event, person);
  }
}
