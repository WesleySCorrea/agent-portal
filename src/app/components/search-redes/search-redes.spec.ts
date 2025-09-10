import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRedes } from './search-redes';

describe('SearchRedes', () => {
  let component: SearchRedes;
  let fixture: ComponentFixture<SearchRedes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRedes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRedes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
