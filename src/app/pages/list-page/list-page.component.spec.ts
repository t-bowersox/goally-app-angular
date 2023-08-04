import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { GoalsService } from 'src/app/services/goals.service';
import { ListPageComponent } from './list-page.component';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let goalsServiceSpy: jasmine.SpyObj<GoalsService>;

  beforeEach(() => {
    goalsServiceSpy = jasmine.createSpyObj('GoalsService', ['getGoalsForUser']);
    goalsServiceSpy.getGoalsForUser.and.returnValue(of([]));
    TestBed.configureTestingModule({
      imports: [ListPageComponent],
      providers: [{ provide: GoalsService, useValue: goalsServiceSpy }],
    });
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
