import AlexioHead from "@/src/AlexioHead";
import AlexioState from "@/src/Context";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AlexioState>
      <AlexioHead />
      {<Component {...pageProps} />}
    </AlexioState>
  );
}
