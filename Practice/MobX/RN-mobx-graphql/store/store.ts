import { gql } from '@apollo/client';
import { makeAutoObservable } from 'mobx';
import { client } from './apolloClient';

type CountryData = {
  country: {
    name: string;
    native: string;
    capital: string;
    emoji: string;
    currency: string;
  };
};

class PostsStore {
  countryData: CountryData | null = null;
  loading: boolean = false;
  error: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getCountryData(countryCode: string) {
    this.loading = true;

    const { data, error, loading } = await client.query<CountryData>({
      query: gql`
        query Country {
          country(code: countryCode) {
            name
            native
            capital
            emoji
            currency
          }
        }
      `,
    });

    if (error) {
      this.error = true;
    } else {
      this.error = false;
      this.countryData = data;
    }

    this.loading = false;
  }
}
