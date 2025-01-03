import { Browser, Page } from "puppeteer";
import { WorkflowTask } from "./workflow";

export type Environment = {
  browser?: Browser;
  page?: Page;
  // Phases with nodeId/taskId as key
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
  setOutput(name: T["outputs"][number]["name"], value: string): void;

  getBrowser(): Browser | undefined;
  setBrowser(browser: Browser): void;

  setPage(page: Page): void;
  getPage(): Page | undefined;
};
