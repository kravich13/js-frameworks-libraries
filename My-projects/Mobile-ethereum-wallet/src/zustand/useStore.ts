import Web3 from 'web3';
import create from 'zustand';
import { ethProvider } from '../ethProvider';
import { IResultOfEtherscan, IUseStore } from './interfaces';

export const useStore = create<IUseStore>((set, get) => ({
  privateKey: '0xd8d5d303fe49591492f5d9a4f4b5f2b3a3bff615fe588556fc3b9231bf8716a4',
  address: '0xaa086875715e69137b517b05ef07eb9a5ff4704f',
  balance: 0,
  refreshing: false,
  alertText: '',
  isPendingTransaction: false,
  transactions: [],
  transactionCount: 0,

  setPrivateKey: (privateKey: string) => {
    try {
      const { address } = ethProvider.accounts.privateKeyToAccount(privateKey);

      set({ privateKey, address });
    } catch (err) {
      set({ alertText: 'Wrong QR code' });
    }
  },

  getBalance: async (address: string) => {
    const newBalance = await ethProvider.getBalance(address);
    const newBalanceFromWei = Web3.utils.fromWei(newBalance, 'ether');

    set({ balance: Number(newBalanceFromWei) });
  },

  onRefresh: async (address: string) => {
    set({ refreshing: true });

    await Promise.all([get().getBalance(address), get().getTransactions(address)]);

    set({ refreshing: false });
  },

  resetAlert: () => {
    set({ alertText: '' });
  },

  resetPrivateKey: () => {
    set({ privateKey: '' });
  },

  getTransactions: async (address: string) => {
    try {
      const transactionCount = await ethProvider.getTransactionCount(address);

      const latestTransaction = 10;

      let page = 1;
      let offset = latestTransaction;

      const skipElements = transactionCount - latestTransaction;

      if (skipElements < latestTransaction) {
        offset = transactionCount;
      } else {
        page = 2;
        offset = skipElements;
      }

      const response = await fetch(
        `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=IF1U7G2VPY4XEY6XP6P1FZX7SBCWUW2G9Y`
      );
      const { result } = await response.json();

      const correctData = (result as IResultOfEtherscan[])
        .map(({ from, to, value, txreceipt_status }) => ({
          from,
          to,
          value: Web3.utils.fromWei(value, 'ether'),
          txreceipt_status,
        }))
        .reverse()
        .filter((data, index) => index < latestTransaction);

      set({ transactions: correctData, transactionCount });
    } catch (err) {
      console.warn(err);
    }
  },

  sendTransaction: async (fromAddress: string, toAddress: string, value: string) => {
    ethProvider.accounts.wallet.add(get().privateKey);

    set({ isPendingTransaction: true });

    try {
      ethProvider
        .sendTransaction({
          from: fromAddress,
          to: toAddress,
          value: Web3.utils.toWei(value, 'ether'),
          gas: 21000,
        })
        .on('sending', () => {
          set({ isPendingTransaction: true });
        })
        .on('receipt', () => {
          set({ isPendingTransaction: false });
        });

      set({ alertText: 'Transaction has been sent' });
    } catch (err) {
      console.warn(err);
      set({ alertText: 'An internal error has occurred', isPendingTransaction: false });
    }
  },
}));
