import React from "react";

import useDefinition from "./hooks/useDefinition";

const Definition = ({ word }) => {
  const { def } = useDefinition(word);

  return <>{JSON.stringify(def)}</>;
};

export default Definition;
