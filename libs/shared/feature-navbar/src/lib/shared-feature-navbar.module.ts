import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedFeatureAuthorDetailsModule } from '@ngrecipes-nx/shared/feature-author-details';

@NgModule({
  imports: [CommonModule, MatToolbarModule, SharedFeatureAuthorDetailsModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class SharedFeatureNavbarModule {}
