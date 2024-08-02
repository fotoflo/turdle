import { useEffect, useState } from "react";
import { staticFetcher } from "../../helpers/staticFetcher";

export default function useDefinition(word) {
  const [def, setDef] = useState();

  useEffect(() => {
    async function fetchData() {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const data = await staticFetcher(url);
      setDef(data);
    }

    fetchData();
  }, [word]);

  return { def };
}
