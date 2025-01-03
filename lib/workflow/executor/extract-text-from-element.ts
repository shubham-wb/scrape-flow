import { ExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "../task/page-to-html";
import { ExtractTextFromElement } from "../task/extract-text-from-element";
import * as cheerio from "cheerio";
export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      console.error("Selector not found");
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      console.error("Html not defined");
      return false;
    }
    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      console.error("Element not found");
      return false;
    }
    const extractedText = $.text(element);
    if (!extractedText) {
      console.error("Element has no text");
      return false;
    }

    environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
