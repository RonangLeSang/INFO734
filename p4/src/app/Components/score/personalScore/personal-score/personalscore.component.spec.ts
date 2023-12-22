import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalscoreComponent } from './personalscore.component';

describe('PersonalScoreComponent', () => {
  let component: PersonalscoreComponent;
  let fixture: ComponentFixture<PersonalscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalscoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
