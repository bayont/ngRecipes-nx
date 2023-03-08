import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngrecipes-nx-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultViewComponent {}
