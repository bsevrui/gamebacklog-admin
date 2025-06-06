import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformModulePage } from './platform-module.page';

describe('PlatformModulePage', () => {
  let component: PlatformModulePage;
  let fixture: ComponentFixture<PlatformModulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});