import { DocumentationSection } from "../types";

export const DocumentationLayout = {};

export const Documentation: DocumentationSection = {
  title: "Documentation",
  path: "/docs",
  links: [
    {
      title: "Getting started",
      links: [
        { title: "Introduction", link: "/docs" },
        { title: "Quickstart", link: "/docs/quickstart" },
      ],
    },
    {
      title: "Dashboard",
      links: [
        { title: "Interface", link: "/docs/interface" },
        { title: "Message panel", link: "/docs/message-pange" },
        { title: "Agent customization", link: "docs/agent-customization" },
      ],
    },
    {
      title: "Chat Widget",
      links: [
        { title: "Workflow", link: "/docs/workflow" },
        { title: "Customization", link: "/docs/customization" },
      ],
    },
  ],
};

export const APIReference: DocumentationSection = {
  title: "API Reference",
  path: "docs/api-reference",
  links: [
    {
      title: "Initialization",
      links: [
        { title: "Install package", link: "docs/api-reference" },
      ],
    },
    {
      title: "Commands",
      links: [{title: "dingloIO.respond()", link: "docs/api-reference/commands"},{title: "dingloIO.save()", link: "docs/api-reference/commands"},{title: "other", link: "docs/api-reference/commands"}],
    },
  ],
};

export const DocumentationTypes: Array<DocumentationSection> = [Documentation, APIReference];


//code example
export const packageSetup = `import DingloIO from "dinglo-io";

const dingloIO = new DingloIO();
dingloIO.initializeSocket("dinglo-e4d4fd64e6ab4bd19e2cf3684ad70dd8");
`