import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedFeatureAuthorDetailsModule } from '@ngrecipes-nx/shared/feature-author-details';
import { createComponentFactory } from '@ngneat/spectator/jest';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  const createComponent = createComponentFactory({
    component: NavbarComponent,
    imports: [MatToolbarModule, SharedFeatureAuthorDetailsModule],
  });
  const testSetup = () => {
    const spectator = createComponent();
    return {
      spectator,
    };
  };

  it('should create', () => {
    const { spectator } = testSetup();
    expect(spectator.component).toBeTruthy();
  });
});
