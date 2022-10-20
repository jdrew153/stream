import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const queryClient = new QueryClient;

function MyApp({ Component, pageProps }: AppProps) {

  return  (
  
  <QueryClientProvider client={queryClient}>
    <MantineProvider
  withGlobalStyles
  withNormalizeCSS
  theme={{
    /** Put your mantine theme override here */
    colorScheme: 'dark',
  }}
>
  <Component {...pageProps} />
</MantineProvider>
  </QueryClientProvider>)
}

export default MyApp
