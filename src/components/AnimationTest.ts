import { customElement, property, state } from "lit/decorators.js";
import { AppStyledElement } from "./AppStyledElement";
import { css, html, LitElement } from "lit";
import { map } from "lit/directives/map.js";
import { animate } from "@lit-labs/motion";
import { Person } from "../data/Person";

@customElement("animation-test")
export class AnimationTest extends AppStyledElement(css`
  person-card {
    transition: 500ms ease-in-out;
  }
`) {
  @property({ type: Object, attribute: false })
  selection: Person | undefined = undefined;

  constructor() {
    super();
  }

  protected render() {
    return html`<div class="flex flex-row flex-wrap overflow-y-hidden">${this.renderPeople()}</div>`;
  }

  renderPeople() {
    return map([...Array(100).keys()], (i) => {
      const id = `${i + 1}`;
      const person: Person = {
        id: `${id}`,
        firstName: "First",
        lastName: "Last",
        email: `me-${i + 1}@me.uk`,
        address: "123 Fake Street",
        mobile: "0123456789",
        dateOfBirth: new Date(),
      };
      if (!this.selection || this.selection.id == id) {
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
              // width: "0px",
              // padding: "0",
              // margin: "0",
            },
            {
              opacity: 1,
              // width: "48px",
              // padding: "0.5rem",
              // margin: "10px",
            },
          ],
          out: [
            {
              opacity: 1,
              // width: "48px",
              // padding: "0.5rem",
              // margin: "10px",
            },
            {
              opacity: 0,
              // width: "0px",
              // padding: "0",
              // margin: "0",
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
