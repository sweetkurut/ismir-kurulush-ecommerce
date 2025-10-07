declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}
declare module "*.woff" {
    const content: string;
    export default content;
}

declare module "*.woff2" {
    const content: string;
    export default content;
}
declare module "*.ttf" {
    const content: string;
    export default content;
}
declare module "*.svg" {
    import React from "react";

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";

declare const __IS_DEV__: boolean;
