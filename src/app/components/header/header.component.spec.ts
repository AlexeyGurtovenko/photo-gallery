import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatButtonModule, MatIconModule, HeaderComponent, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-toolbar', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
  });

  it('should render the correct number of links', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-button]'));
    expect(buttons.length).toBe(component.links().length);
  });

  it('should render each link with correct title and icon', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-button]'));

    buttons.forEach((button, index) => {
      const link = component.links()[index];
      const icon = button.query(By.css('mat-icon')).nativeElement;
      const text = button.nativeElement.textContent.trim();

      expect(text.includes(link.title)).toBeTrue();
      expect(icon.textContent.trim()).toBe(link.iconName);
    });
  });
});
