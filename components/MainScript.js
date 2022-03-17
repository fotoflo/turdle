import React from "react";
import Script from "next/script";

import { GA_ID } from "../next.config";

function MainScript({props}) {
  return (
    <>
      <Script id="ga-tag"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga-config"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
    </>
  );
}

export default MainScript;
