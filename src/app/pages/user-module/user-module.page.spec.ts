import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserModulePage } from './user-module.page';

describe('UserModulePage', () => {
  let component: UserModulePage;
  let fixture: ComponentFixture<UserModulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});