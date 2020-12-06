import { Currency } from './Currency';
import { Language } from './Language';

export interface CountryDetails {
    name: string;
    population: bigint;
    timezones: string[];
    capital: string;
    currencies: Currency[];
    languages: Language[];
    borders: string[];
}