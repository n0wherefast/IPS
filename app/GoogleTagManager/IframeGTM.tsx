// const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
import Script from "next/script";


export default function IframeGTM() {
  // if (!GTM_ID) return null;

  return (
     <Script id="conversion-tracking" strategy="afterInteractive">
      {`
        gtag('event', 'conversion', {'send_to': 'AW-16587281816/zGmuCKu6vtwZEJirt-u9'});
      `}
    </Script>
  );
}



{/* <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript> */}