import { html } from "lit";
import { PersonRepository, PersonRepositoryInMemory } from "./data/PersonRepository";
import { TailwindElement } from "./TailwindElement";
import { customElement } from "lit/decorators.js";
import { Person } from "./data/Person";

@customElement("x-people")
export class PeopleElement extends TailwindElement() {
  personRepository: PersonRepository;

  constructor() {
    super();
    this.personRepository = new PersonRepositoryInMemory();
  }
  protected render() {
    return html`
      <ul class="menu menu-xs bg-base-200 rounded-box w-56">
        <li>
          <h2 class="menu-title">People</h2>
          <ul>
            ${this.personRepository.getPeople().map(this.renderPersonItem)}
          </ul>
        </li>
      </ul>
    `;
  }

  private renderPersonItem(person: Person) {
    return html`<li><a>${person.id} - ${person.firstName} ${person.lastName}</a></li>`;
  }
}

/*

        ${this.personRepository
          .getPeople()
          .map((person) => html` <li>${person.id} - ${person.firstName} ${person.lastName}</li> `)}

          */
