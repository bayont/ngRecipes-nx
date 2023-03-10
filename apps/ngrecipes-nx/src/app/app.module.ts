import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecipesFeatureShellModule } from '@ngrecipes-nx/recipes/feature-shell';
import { SharedFeatureNavbarModule } from '@ngrecipes-nx/shared/feature-navbar';
import { SharedFeatureFooterModule } from '@ngrecipes-nx/shared/feature-footer';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RecipesFeatureShellModule,
    SharedFeatureNavbarModule,
    SharedFeatureFooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
