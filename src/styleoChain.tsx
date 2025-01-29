import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'

const sourceId = 11155111

export const styleoChain = defineChain({
  ...chainConfig,
  id: 4267,
  name: 'Styleo CHAIN',
  nativeCurrency: { name: 'Styleo Coin', symbol: 'STC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet.styleochain.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://testnet.styleoscan.com/',
      apiUrl: 'https://testnet.styleoscan.com/api'
    },
  },

  contracts: {
    ...chainConfig.contracts,
    l2OutputOracle: {
      [sourceId]: {
        address: '0xdc58E4b60DdeA49475a74447A2cFF0c89cc03633',
      },
    },
    portal: {
      [sourceId]: {
        address: '0x70e81400b2e4d7Dff9174Ef6941B3fd513829052',
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0x3345b86284eb0D4b781cb517D6A82cB49d2118c1',
      },
    },
  },
  sourceId,
  // testnet: true,
})
