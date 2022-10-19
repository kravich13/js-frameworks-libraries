export interface IUseStore {
  privateKey: string;
  address: string;
  balance: number;
  refreshing: boolean;
  alertText: string;
  isPendingTransaction: boolean;
  transactions: IDataTransaction[];
  transactionCount: number;

  setPrivateKey: (privateKey: string) => void;
  getBalance: (address: string) => Promise<void>;
  onRefresh: (address: string) => Promise<void>;
  resetAlert: () => void;
  resetPrivateKey: () => void;
  sendTransaction: (fromAddress: string, toAddress: string, value: string) => Promise<void>;
  getTransactions: (address: string) => Promise<void>;
}

export interface IResultOfEtherscan {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
}

export interface IDataTransaction {
  from: string;
  to: string;
  value: string;
  txreceipt_status: string;
}
