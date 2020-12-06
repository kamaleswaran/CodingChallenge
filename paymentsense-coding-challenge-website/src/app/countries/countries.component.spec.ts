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
});
