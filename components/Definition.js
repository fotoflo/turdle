import React from "react";

import useDefinition from "./hooks/useDefinition";

const Definition = ({ word }) => {
  const { def } = useDefinition(word);

  return (
    <div>
      <li>
        {def?.[0].meanings.map((meaning) => {
          return meaning.definitions[0].definition;
        })}
      </li>
    </div>
  );
};

export default Definition;
