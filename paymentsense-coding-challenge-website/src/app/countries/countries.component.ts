import { Component, OnInit } from '@angular/core';
import { PaymentsenseCodingChallengeApiService } from '../services';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  public countries = [];
  public selectedCountry = {};

  constructor(private paymentsenseCodingChallengeApiService: PaymentsenseCodingChallengeApiService) { }

  ngOnInit() {
    this.paymentsenseCodingChallengeApiService.getCountries().pipe(take(1))
      .subscribe(
        data => {
          this.countries = data;
        }
      )
  }

  showDetails(countryCode: string) {
    this.paymentsenseCodingChallengeApiService.getCountryDetails(countryCode).pipe(take(1))
      .subscribe(
        data => {
          this.selectedCountry = data
        }
      )
  }
}
