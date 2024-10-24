import { html, css } from "lit";
import { PersonRepository, personRepositoryContext, PersonRepositoryInMemory } from "../data/PersonRepository";
import { AppStyledElement } from "./AppStyledElement";
import { customElement, property } from "lit/decorators.js";
import { Person } from "../data/Person";
import { consume } from "@lit/context";
import { map } from "lit/directives/map.js";
import { animate } from "@lit-labs/motion";
import "./PersonCard";
import "./Icon";

@customElement("people-list")
export class PeopleList extends AppStyledElement(css`
  :host {
    width: 100%;
  }
  person-card {
    transition: 500ms ease-in-out;
  }
`) {
  @property({ type: Object, attribute: false })
  selection: Person | undefined = undefined;

  @consume({ context: personRepositoryContext })
  private personRepository?: PersonRepository;

  protected render() {
    return html` ${this.renderPeopleOrSelection()} `;
  }

  private renderPeopleOrSelection() {
    return html`<div class="flex flex-row flex-wrap overflow-y-hidden">
      ${map(this.personRepository?.getPeople() || [], (person) => this.renderPersonItem(person))}
    </div>`;
  }

  private renderPersonItem(person: Person) {
    let width = this.selection && this.selection.id === person.id ? "w-full" : "w-96";

    if (!this.selection || (this.selection && this.selection.id === person.id)) {
      return html`
        <person-card
          class="${width} inline-block"
          id=${"person-" + person.id}
          .person=${person}
          ${animate({
            properties: ["left", "top", "display", "opacity", "display", "padding", "margin"],
            keyframeOptions: {
              duration: 500,
              easing: "ease-in-out",
            },
            in: [{ opacity: 0 }, { opacity: 1 }],
            out: [{ opacity: 1 }, { opacity: 0 }],
          })}
          @click=${(e: Event) => this.selectPerson(e, person)}
        ></person-card>
      `;
    }
  }

  selectPerson(event: Event, person: Person) {
    event.preventDefault();
    if (this.selection && this.selection.id == person.id) {
      this.selection = undefined;
    } else {
      this.selection = person;
    }
    this.requestUpdate();
    // this.dispatchEvent(new CustomEvent("changed", { bubbles: true, composed: true, detail: { person: person } }));
  }
}
