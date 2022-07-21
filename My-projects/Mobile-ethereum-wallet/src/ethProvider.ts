import Web3 from 'web3';

export const ethProvider = new Web3(
  new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/b5f2c21f38084eb68699da3ad20ed6a1')
).eth;
