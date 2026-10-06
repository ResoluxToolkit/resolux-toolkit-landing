import { defineMcp } from "@lovable.dev/mcp-js";

import getProductOverview from "./tools/get-product-overview";
import getProjectStatus from "./tools/get-project-status";

export default defineMcp({
  name: "resolux-toolkit-landing",
  title: "Resolux Toolkit Landing",
  version: "0.1.0",
  instructions:
    "Public, read-only information about ResoluxToolkit. Use the overview tool for the product purpose and principles, and the status tool for confirmed platform progress. Never infer unpublished roadmap commitments.",
  tools: [getProductOverview, getProjectStatus],
});