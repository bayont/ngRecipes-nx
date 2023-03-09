import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecipesFeatureShellModule } from '@ngrecipes-nx/recipes/feature-shell';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RecipesFeatureShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
