import { Component } from '@angular/core';
import { DialogService } from '@ngrecipes-nx/recipes/feature-author-details';

@Component({
  selector: 'ngrecipes-nx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private dialogService: DialogService) {}

  openAuthorDetailsDialog(): void {
    this.dialogService.openDialog();
  }
}
