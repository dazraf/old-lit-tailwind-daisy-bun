import { customElement, property } from "lit/decorators.js";
import { AppStyledElement } from "./AppStyledElement";
import { Person } from "../data/Person";
import { css, html } from "lit";

@customElement("person-card")
export class PersonCard extends AppStyledElement(css`
  :host {
    display: inline-block;
  }
`) {
  @property({ type: Object, attribute: false })
  person: Person | null = null;

  protected render() {
    let bgColor = "bg-base-200";
    let textColor = "text-base-content";
    if (!this.person) {
      return html``;
    }
    const genderId = this.person.gender == "female" ? "girl" : "boy";
    return html`
      <div class="card ${bgColor} ${textColor} min-w-72 m-0 min-h-50 p-4 border border-base-300 shadow-xl">
        <div class="flex flex-col gap-4 cursor-pointer">
          <div class="flex flex-row gap-4 items-center">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img src="https://avatar.iran.liara.run/public/${genderId}?username=${this.person.email}" />
              </div>
            </div>
            <h2 class="font-semibold">${this.person.firstName} ${this.person.lastName}</h2>
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
                <td>${this.getDoB(this.person)}</td>
              </tr>
              <tr>
                <td><b-icon icon="envelope-at"></b-icon></td>
                <td>${this.person.email}</td>
              </tr>
              <tr>
                <td><b-icon icon="phone"></b-icon></td>
                <td>${this.person.mobile}</td>
              </tr>
              <tr>
                <td><b-icon icon="geo-alt"></b-icon></td>
                <td>${this.person.address}</td>
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
}
