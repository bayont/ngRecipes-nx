import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDetailsDialogComponent } from './author-details-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthorDetailsDialogService {
  constructor(private matDialog: MatDialog) {}

  openDialog() {
    this.matDialog.open(AuthorDetailsDialogComponent);
  }
}
