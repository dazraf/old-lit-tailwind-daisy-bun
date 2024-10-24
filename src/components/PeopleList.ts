import { html, css } from "lit";
import { PersonRepository, personRepositoryContext, PersonRepositoryInMemory } from "../data/PersonRepository";
import { AppStyledElement } from "./AppStyledElement";
import { customElement, property, query, state } from "lit/decorators.js";
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

  @state()
  private searchQuery = "";

  @query("input")
  private inputElement!: HTMLInputElement;

  protected render() {
    return html`
      <label class="input input-bordered flex items-center gap-2 w-96">
        <input
          type="text"
          class="grow"
          placeholder="Search people"
          value=${this.searchQuery}
          @input=${this.searchUpdated}
        />
        <button class="${this.searchQuery == "" ? "hidden" : ""}" @click=${this.clearSearch}>
          <b-icon icon="x"></b-icon>
        </button>
      </label>

      ${this.renderPeopleOrSelection()}
    `;
  }

  private renderPeopleOrSelection() {
    const people =
      this.searchQuery === ""
        ? this.personRepository!.getPeople()
        : this.personRepository!.fuzzySearch(this.searchQuery);

    return html`<div class="flex flex-row flex-wrap overflow-y-hidden gap-4 my-4">
      ${map(people || [], (person) => this.renderPersonItem(person))}
    </div>`;
  }

  private renderPersonItem(person: Person) {
    let width = this.selection && this.selection.id === person.id ? "w-full" : "w-80";

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

  searchUpdated(event: Event) {
    this.searchQuery = this.inputElement.value.trim();
    this.requestUpdate();
  }
  clearSearch(event: Event) {
    this.inputElement.value = "";
    this.searchQuery = "";
  }
}
