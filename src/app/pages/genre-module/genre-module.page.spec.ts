import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenreModulePage } from './genre-module.page';

describe('GenreModulePage', () => {
  let component: GenreModulePage;
  let fixture: ComponentFixture<GenreModulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});