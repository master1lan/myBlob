import "@styles/globals.css";
import ViewportProvider from "@components/provider";
import Layout from "@components/layout";
import { Provider } from 'react-redux';
import store from "@utils/store";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ViewportProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ViewportProvider>
    </>
  )
}
