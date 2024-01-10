import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgameComponent } from './listgame.component';

describe('ListgameComponent', () => {
  let component: ListgameComponent;
  let fixture: ComponentFixture<ListgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListgameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
