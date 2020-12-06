import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/Country';
import { CountryDetails } from '../models/CountryDetail';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsenseCodingChallengeApiService {
  constructor(private httpClient: HttpClient) {}

  public getHealth(): Observable<string> {
    return this.httpClient.get(`${environment.paymentSenseCodingChallengeApiUrl}/health`, { responseType: 'text' });
  }

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${environment.paymentSenseCodingChallengeApiUrl}/PaymentsenseCodingChallenge`);
  }

  public getCountryDetails(countryCode: string): Observable<CountryDetails> {
    return this.httpClient.get<CountryDetails>(`${environment.paymentSenseCodingChallengeApiUrl}/PaymentsenseCodingChallenge/${countryCode}`);
  }
}
