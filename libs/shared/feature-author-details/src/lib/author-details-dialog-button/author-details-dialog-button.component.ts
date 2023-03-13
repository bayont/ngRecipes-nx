import { Component } from '@angular/core';
import { AuthorDetailsDialogService } from '../author-details-dialog/author-details-dialog.service';

@Component({
  selector: 'ngrecipes-nx-author-details-dialog-button',
  templateUrl: './author-details-dialog-button.component.html',
  styleUrls: ['./author-details-dialog-button.component.scss'],
})
export class AuthorDetailsDialogButtonComponent {
  constructor(private authorDetailsDialogService: AuthorDetailsDialogService) {}

  public onOpenAuthorDetailsDialog() {
    this.authorDetailsDialogService.openDialog();
  }
}
