import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyDankovComponent } from './why-dankov.component';

describe('WhyDankovComponent', () => {
  let component: WhyDankovComponent;
  let fixture: ComponentFixture<WhyDankovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyDankovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyDankovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
