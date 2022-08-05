import WalletConnect from '@walletconnect/client';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';

export const ethProvider = new Web3(
  new Web3.providers.WebsocketProvider(
    'wss://ropsten.infura.io/ws/v3/b5f2c21f38084eb68699da3ad20ed6a1'
  )
).eth;

// const provider = new WalletConnectProvider({
//   infuraId: 'b5f2c21f38084eb68699da3ad20ed6a1',
// });

// (async () => {
//   const test = await provider.enable();
//   console.log(test);
// })();

const connector = new WalletConnect({
  uri: 'wc:4124be48-d996-4817-88ef-cfad9379dcba@1?bridge=https%3A%2F%2Fz.bridge.walletconnect.org&key=0fc38025c8be12735f936a160dfef46125e432b211e6551b15326dd5ccd5c9a0',
});

(async () => {
  const test = await connector.createSession();

  console.log(connector.bridge);
})();
