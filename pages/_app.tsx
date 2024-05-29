import type { AppProps } from "next/app";
import MainLayout from "~/layout/MainLayout";
import "~/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
