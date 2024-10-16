import { consume } from "@lit/context";
import { PersonRepository, personRepositoryContext } from "../data/PersonRepository";
import { AppStyledElement } from "./AppStyledElement";
import { css, html } from "lit";
import { Person } from "../data/Person";
import { customElement, property } from "lit/decorators.js";

@customElement("person-editor")
export class PersonEditor extends AppStyledElement(css`
  :host {
    padding: 0 !important;
  }
`) {
  @consume({ context: personRepositoryContext })
  private personRepository?: PersonRepository;

  @property({ type: Object, attribute: false })
  person: Person | undefined;
  protected render() {
    if (this.person) {
      return html`
        <div class="card card-side bg-base-100 shadow-xl">
          <div class="card-body">
            <label class="input input-bordered flex items-center gap-2">
              <span class="font-semibold">First Name</span>
              <input type="text" class="grow" value=${this.person.firstName} />
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <span class="font-semibold">Lasts Name</span>
              <input type="text" class="grow" value=${this.person.lastName} />
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <span class="font-semibold">Date of Birth</span>
              <input type="date" class="grow" value=${this.person.dateOfBirth.toISOString().split("T")[0]} />
            </label>
            <div class="card-actions justify-end">
              <button class="btn btn-neutral">Cancel</button>
              <button class="btn btn-primary btn-disabled">Update</button>
            </div>
          </div>
        </div>
      `;
    } else {
      return html``;
    }
  }
}
