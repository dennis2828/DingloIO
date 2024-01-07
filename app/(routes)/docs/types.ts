//Documentation Section
export interface DocumentationSection {
    title: string;
    path: string;
    links: Array<DocumentationLink>;
}

export interface DocumentationLink {
    title: string;
    links: Array<DocumentationSublink>;
}

export interface DocumentationSublink {
    title: string;
    link: string;
}