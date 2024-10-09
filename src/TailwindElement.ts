import { CSSResult, LitElement, css, unsafeCSS } from 'lit';
import inlineCss from './index.css?inline';
export const appStyle = unsafeCSS(inlineCss);

export function TailwindElement(componentStyle: CSSResult = css``) {
    return class extends LitElement {
        static styles = [
            css`
            `,
            appStyle,
            // componentStyle
        ]
    }
}