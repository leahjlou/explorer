import { apiClients, createConfig } from '@common/api/client';
import { DEFAULT_LIST_LIMIT } from '@common/constants';
import { useAppSelector } from '@common/state/hooks';
import { selectActiveNetwork } from '@common/state/network-slice';
import {
  AddressBalanceResponse,
  MempoolTransactionListResponse,
} from '@stacks/stacks-blockchain-api-types';
import { TransactionsListResponse } from '@store/transactions';

export const getAddressQueries = (networkUrl: string) => {
  const clients = apiClients(createConfig(networkUrl));
  return {
    fetchCoreApiInfo: () => () => {
      return clients.infoApi.getCoreApiInfo();
    },
    fetchBns: (address: string) => () => {
      return clients.bnsApi.getNamesOwnedByAddress({ address, blockchain: 'stacks' });
    },
    fetchAccountBalance: (address: string) => () => {
      return clients.accountsApi.getAccountBalance({
        principal: address,
      }) as unknown as AddressBalanceResponse;
    },
    fetchAccountInfo: (address: string) => () => {
      return clients.accountsApi.getAccountInfo({ principal: address });
    },
    getAccountAssets: (address: string) => () => {
      return clients.accountsApi.getAccountAssets({ principal: address, limit: 40 });
    },
    fetchTransactionsForAddress:
      (address: string, limit = DEFAULT_LIST_LIMIT, offset = 0) =>
      () => {
        return clients.accountsApi.getAccountTransactions({
          principal: address,
          offset,
          limit,
        }) as unknown as TransactionsListResponse;
      },
    fetchMempoolTransactionsForAddress:
      (address: string, limit = DEFAULT_LIST_LIMIT, offset = 0) =>
      () => {
        return clients.transactionsApi.getMempoolTransactionList({
          address,
          offset,
          limit,
        }) as unknown as MempoolTransactionListResponse;
      },
  };
};

export const useAddressQueries = () => {
  const network = useAppSelector(selectActiveNetwork);
  return getAddressQueries(network.url);
};
