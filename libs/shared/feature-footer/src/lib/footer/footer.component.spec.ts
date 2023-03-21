import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedFeatureAuthorDetailsModule } from '@ngrecipes-nx/shared/feature-author-details';

import { FooterComponent } from './footer.component';
import { createComponentFactory } from '@ngneat/spectator/jest';

describe('FooterComponent', () => {
  const createComponent = createComponentFactory({
    component: FooterComponent,
    imports: [SharedFeatureAuthorDetailsModule, MatToolbarModule],
  });
  const testSetup = () => {
    const spectator = createComponent();
    const component = spectator.component;
    const fixture = spectator.fixture;
    return { component, fixture, spectator };
  };
  it('should create', () => {
    const { component } = testSetup();
    expect(component).toBeTruthy();
  });
});
