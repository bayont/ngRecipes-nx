import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextStylePipe } from './text-style.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TextStylePipe],
  exports: [TextStylePipe],
})
export class SharedUtilTextStyleModule {}
