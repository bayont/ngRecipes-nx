import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedFeatureAuthorDetailsModule } from '@ngrecipes-nx/shared/feature-author-details';

@NgModule({
  imports: [CommonModule, MatToolbarModule, SharedFeatureAuthorDetailsModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class SharedFeatureFooterModule {}
