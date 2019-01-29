import React from "react";
import Highlighter from "react-highlight-words";

const Highlight = ({ children, match }) => (
  <Highlighter
    highlightClassName="YourHighlightClass"
    searchWords={[match]}
    autoEscape={true}
    textToHighlight={children}
  />
);

export default Highlight;
