import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RecipesFeatureAuthorDetailsModule } from '@ngrecipes-nx/recipes/feature-author-details';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RecipesFeatureAuthorDetailsModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class FeatureNavbarModule {}
