import { customElement, property, state } from "lit/decorators.js";
import { AppStyledElement } from "./AppStyledElement";
import { css, html, LitElement } from "lit";
import { map } from "lit/directives/map.js";
import { animate } from "@lit-labs/motion";
import { Person } from "../data/Person";
import { generateRandomPerson } from "../data/RandomPersonGenerator";

@customElement("animation-test")
export class AnimationTest extends AppStyledElement(css`
  person-card {
    transition: 500ms ease-in-out;
  }
`) {
  @property({ type: Object, attribute: false })
  selection: Person | undefined = undefined;

  private people = [...Array(100)].map(() => generateRandomPerson());

  protected render() {
    return html`<div class="flex flex-row flex-wrap overflow-y-hidden">${this.renderPeople()}</div>`;
  }

  renderPeople() {
    return map(this.people, (person) => {
      if (!this.selection || this.selection.id == person.id) {
        return this.renderPersonItem(person);
      } else {
        return html``;
      }
    });
  }

  renderPersonItem(person: Person) {
    const width = this.selection && this.selection.id == person.id ? "w-full" : "w-62";

    return html`
      <person-card
        class="${width} inline-block"
        .person=${person}
        ${animate({
          properties: ["left", "top", "display", "opacity", "display", "padding", "margin"],
          keyframeOptions: {
            easing: "ease-in-out",
            duration: 500,
          },
          in: [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ],
          out: [
            {
              opacity: 1,
            },
            {
              opacity: 0,
            },
          ],
        })}
        @click=${() => this.select(person)}
      ></person-card>
    `;
  }

  select(person: Person) {
    if (this.selection && this.selection.id == person.id) {
      this.selection = undefined;
    } else {
      this.selection = person;
    }
  }
}
