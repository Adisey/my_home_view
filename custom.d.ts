declare module "*.svg" {
    const context: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default context;
}

// declare module "*.module.scss";

declare module "*.graphql" {
    const context: TypedDocumentNode;
    export default context;
}