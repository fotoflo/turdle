import { useEffect, useState } from "react";
import { fetchDefinition, staticFetcher } from "../../helpers/staticFetcher";
import useSWRImmutable from "swr/immutable";

export default function useDefinition(word) {
  const defFetcher = () => fetchDefinition(word);

  const { data: def } = useSWRImmutable(word, defFetcher);

  return { def };
}
