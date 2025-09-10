import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mercado } from './mercado';

describe('Mercado', () => {
  let component: Mercado;
  let fixture: ComponentFixture<Mercado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mercado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mercado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
