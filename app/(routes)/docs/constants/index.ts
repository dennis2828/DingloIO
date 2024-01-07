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
  title: "Introduction",
  path: "docs//api-reference",
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