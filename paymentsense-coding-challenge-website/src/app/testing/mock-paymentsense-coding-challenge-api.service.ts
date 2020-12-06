import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Country } from '../models/Country';
import { CountryDetails } from '../models/CountryDetail';
import { Currency } from '../models/Currency';
import { Language } from '../models/Language';

@Injectable({
  providedIn: 'root'
})
export class MockPaymentsenseCodingChallengeApiService {
  public getHealth(): Observable<string> {
    return of('Healthy');
  }

  public getCountries(): Observable<Country[]> {    
    let countries: Country[] = [];
    countries.push({ name: 'UK', flag: 'https://restcountries.eu/data/gbr.svg', alpha3Code: 'GBR' });
    countries.push({ name: 'Canada', flag: 'https://restcountries.eu/data/can.svg', alpha3Code: 'CAN' });
    
    return of(countries);
  }

  public getCountryDetails(countryCode: string): Observable<CountryDetails> {
    let languages: Language[] = [];
    languages.push({ name: 'English' });
    
    let currencies: Currency[] = [];
    currencies.push({ name: 'British Pound', symbol: '$', code: 'GBP' });

    let countryDetails: CountryDetails = {
      name: 'UK',
      timezones: ['UTC-05:00'],
      capital: 'London',
      borders: ['Ireland'],
      population: 2886026,
      languages: languages,
      currencies: currencies
    }

    return of(countryDetails);
  }
}
