import React from "react";

import useDefinition from "./hooks/useDefinition";

const Definition = ({ word }) => {
  const { def } = useDefinition(word);

  return (
    <div>
      <strong>Definitions:</strong>
      {def?.[0].meanings.map((meaning) => {
        const def = meaning.definitions[0].definition;
        return <li key={def}>{def}</li>;
      })}
    </div>
  );
};

export default Definition;
