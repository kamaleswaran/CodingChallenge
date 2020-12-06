import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/Country';
import { CountryDetails } from '../models/CountryDetail';

@Injectable({
  providedIn: 'root'
})
export class PaymentsenseCodingChallengeApiService {
  constructor(private httpClient: HttpClient) {}

  public getHealth(): Observable<string> {
    return this.httpClient.get('https://localhost:44304/health', { responseType: 'text' });
  }

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>('https://localhost:44304/PaymentsenseCodingChallenge');
  }

  public getCountryDetails(countryCode: string): Observable<CountryDetails> {
    return this.httpClient.get<CountryDetails>(`https://localhost:44304/PaymentsenseCodingChallenge/${countryCode}`);
  }
}
