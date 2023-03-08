import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthorDetailsDialogService } from '@ngrecipes-nx/recipes/feature-author-details';

@Component({
  selector: 'ngrecipes-nx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(private authorDetailsDialogService: AuthorDetailsDialogService) {}

  openAuthorDetailsDialog(): void {
    this.authorDetailsDialogService.openDialog();
  }
}
