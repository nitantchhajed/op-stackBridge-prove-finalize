import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { http, createConfig } from 'wagmi'


import '@rainbow-me/rainbowkit/styles.css';
import {  RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { styleoChain } from './styleoChain.tsx';
import { sepolia } from 'wagmi/chains';

const config = createConfig({
  chains: [styleoChain, sepolia],
  transports: {
    [styleoChain.id]: http("https://testnet.styleochain.com/"),
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/kSNqyjVYwVcoyyMknd7NOq7xLofs05WQ"),
  },
})

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
