import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
