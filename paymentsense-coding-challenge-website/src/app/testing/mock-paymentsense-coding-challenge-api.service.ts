import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class MockPaymentsenseCodingChallengeApiService {
  public getHealth(): Observable<string> {
    return of('Healthy');
  }

  public getCountries(): Observable<Country[]> {    
    let countries: Country[] = [];
    countries.push({ name: 'UK', flag: 'flag.png', alpha3Code: 'GBR' });
    return of(countries);
  }
}
