export interface ModuleSectionHeader {
  title: string;
  description: string;
}

export interface LabeledItem {
  title: string;
  body: string;
}

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
}

export interface FlowDiagramStep {
  title: string;
  color: 'blue' | 'red' | 'slate';
  description: string;
}

export interface CodeSnippet {
  code: string;
  language: 'javascript' | 'http';
}

export interface StatusCodeItem {
  code: string;
  codeClass: string;
  description: string;
}
