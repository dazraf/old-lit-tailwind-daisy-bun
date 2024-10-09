import { CSSResult, LitElement, css, unsafeCSS } from "lit";
import inlineCss from "./index.css?inline";
export const appStyle = unsafeCSS(inlineCss);

/**
 * This function is a factory for creating a new class that extends LitElement with the Tailwind CSS styles.
 * Usage:
 *     <code>
 *      export class MyElement extends TailwindElement() {
 *         ...
 *      }
 *      </code>
 *
 *or with custom styles:
 *     <code>
 *     export class MyElement extends TailwindElement(css`
 *      .my-class {
 *       color: red;
 *     }
 *    `) {
 *      ...
 *     }
 *     </code>
 * @param componentStyle - additional custom styles provided by the derived
 * @returns
 */
export function TailwindElement(componentStyle: CSSResult = css``) {
  return class extends LitElement {
    static styles = [appStyle, componentStyle];
  };
}
