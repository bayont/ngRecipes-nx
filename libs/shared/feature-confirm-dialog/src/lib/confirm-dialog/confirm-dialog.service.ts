import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private readonly matDialog: MatDialog) {}

  public ask(title: string, message: string): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: { title, message },
    });
    return dialogRef.afterClosed();
  }
}
