/**
 * Hacky shadow for Notes to guard max-height for the notes section
 */

import React from "react";
import { Notes } from "mdx-deck";

export default ({ children }) => (
  <Notes>
    <div style={{ maxHeight: "33vh", overflowY: "auto" }}>{children}</div>
  </Notes>
);
