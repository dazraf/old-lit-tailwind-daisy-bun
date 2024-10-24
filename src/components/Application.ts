import { html } from "lit";
import { AppStyledElement } from "./AppStyledElement";
import { customElement, property, state } from "lit/decorators.js";
import { Person } from "../data/Person";
import { provide } from "@lit/context";
import { personRepositoryContext, PersonRepositoryInMemory } from "../data/PersonRepository";
import { Router } from "@lit-labs/router";
import { PathRouteConfigWithBreadcrumb } from "./Breadcrumbs";
import "./Icon";
import "./PeopleList";
import "./ThemeSelector";
import "./Breadcrumbs";
import "./AnimationTest";

@customElement("x-app")
export class Application extends AppStyledElement() {
  @property({ type: Object })
  selection: Person | undefined;

  @provide({ context: personRepositoryContext })
  personRepository = new PersonRepositoryInMemory();

  private routes: PathRouteConfigWithBreadcrumb[] = [
    {
      path: "/",
      name: "Home",
      render: () => html`
        <div class="container mx-auto  m-0 p-2">
          <span class="prose"><h1 class="text-base-content">Hello Root</h1></span>
          <animation-test></animation-test>
        </div>
      `,
      breadcrumbs: ["Home"],
    },
    {
      path: "/people",
      name: "People",
      render: () => html`
        <div class="container mx-auto m-0 p-2 ">
          <input type="text" class="input input-bordered w-full" placeholder="Search people" />

          <div class="flex flex-row">
            <people-list id="people" class="min-w-fit"></people-list>
          </div>
          <div class="divider"></div>
        </div>
      `,
      breadcrumbs: ["Home", "People"],
    },
    {
      path: "/people/:id",
      name: "Person",
      render: (params) => {
        const person = this.personRepository.getPerson(params["id"]!);
        if (!person) {
          return html`<h1>Person not found</h1>`;
        }
        return html`
          <div class="container mx-auto m-0 p-2 ">
            <div class="flex flex-row">
              <people-list id="people" class="min-w-fit"></people-list>
            </div>
            <div class="divider"></div>
          </div>
        `;
      },
      breadcrumbs: [
        "Home",
        "People",
        (params) => {
          const person = this.personRepository.getPerson(params["id"]!);
          if (person) {
            return person?.firstName + " " + person?.lastName;
          } else {
            return "";
          }
        },
      ],
    },
  ];

  private router: Router = new Router(this, this.routes);

  render() {
    return html`
      <div class="navbar fixed w-full z-10 top-0 bg-base-100 bg-opacity-90 backdrop-blur-md">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">Piplz</a>
        </div>
        ${this.toolbar()}
      </div>
      <div class="navbar w-full bg-opacity-100 p-8">Hello</div>
      <app-breadcrumbs .routes=${this.routes} .link=${this.router.link()}></app-breadcrumbs>

      ${this.router.outlet()}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const thisApp = this;

    // Proxy history.pushState to update the router
    globalThis.history.pushState = new Proxy(globalThis.history.pushState, {
      apply: (target, thisArg, argArray: [data: any, unused: string, url?: string | URL | null | undefined]) => {
        const url = argArray[2];
        if (url instanceof URL) {
          this.router.goto(url.pathname);
        } else if (typeof url === "string") {
          if (url.startsWith("/")) {
            this.router.goto(url);
          } else {
            this.router.goto(new URL(url).pathname);
          }
        } else {
          this.router.goto(window.location.pathname);
        }
        return target.apply(thisArg, argArray);
      },
    });
  }

  private toolbar() {
    return html` <div class="flex-none">
      <ul class="menu menu-horizontal bg-base-200 text-2xl rounded-box text-center">
        <li>
          <a href="/">
            <b-icon icon="house-door"></b-icon>
          </a>
        </li>
        <li>
          <a href="/people">
            <b-icon icon="people"></b-icon>
          </a>
        </li>
        <li>
          <a>
            <b-icon icon="bar-chart" filled></b-icon>
          </a>
        </li>
        <li>
          <theme-selector></theme-selector>
        </li>
      </ul>
    </div>`;
  }

  private onPersonSelected(e: CustomEvent) {
    globalThis.history.pushState({}, "", `/people/${e.detail.person.id}`);
  }
}
