import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsenseCodingChallengeApiService } from '../services';
import { MockPaymentsenseCodingChallengeApiService } from '../testing/mock-paymentsense-coding-challenge-api.service';
import { CountriesComponent } from './countries.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxPaginationModule
      ],
      declarations: [CountriesComponent],
      providers: [
        { provide: PaymentsenseCodingChallengeApiService, useClass: MockPaymentsenseCodingChallengeApiService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have list of countries', () => {
    const fixture = TestBed.createComponent(CountriesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let tableRows = compiled.querySelectorAll('.countries tr');
    expect(tableRows.length).toBe(2);
  });

  it('should show no country selected when page loads', () => {
    const fixture = TestBed.createComponent(CountriesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let selectedCountryText = compiled.querySelector('.selectedCountry h2').textContent;
    expect(selectedCountryText).toBe('No country selected!');
  });

  it('should show country details when show detail button clicked', () => {
    const fixture = TestBed.createComponent(CountriesComponent);
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;    
    let showDetailButton = compiled.querySelector('input[type=button]');
    
    showDetailButton.click();
    fixture.detectChanges();

    let selectedCountryText = compiled.querySelector('.selectedCountry h2').textContent;
    expect(selectedCountryText).toBe('Selected country details:');
    expect(compiled.querySelectorAll('.selectedCountry table tr').length).toBe(8);
  });
});
