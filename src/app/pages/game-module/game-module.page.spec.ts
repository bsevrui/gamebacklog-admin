import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameModulePage } from './game-module.page';

describe('GameModulePage', () => {
  let component: GameModulePage;
  let fixture: ComponentFixture<GameModulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});