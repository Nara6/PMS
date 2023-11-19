import { Component, Input, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SnackbarService } from '../services/snackbar.service';

@Component({
    selector: 'app-portrait',
    templateUrl: './portrait.component.html',
    styleUrls: ['./portrait.component.scss'],
})
export class PortraitComponent {
    @Input() src: string = 'assets/images/avatars/image-icon.jpg';
    @Input() delete: boolean;
    @Input() index: string = '';
    @Input() title: string = 'ផ្ទុកឯកសារ​';
    @Input() mode: string = 'READONLY';
    @Input() responseType: string = 'base64';
    @Input() disabled: boolean;
    @Output() srcChange = new EventEmitter();
    constructor(
        public dialog: MatDialog,
        private snackBar: SnackbarService
    ) { }

    remove(): void {
        this.delete = false;
        this.src = 'assets/images/avatars/image-icon.jpg';
        this.srcChange.emit('');
    }

    fileChangeEvent(event: any): void {
        let check: string = '';
        check = event.target.files[0].type;
        // console.log(event.target.files[0].name);
        
        if (check.substring(0, 5) === 'image') {
            const dialogRef = this.dialog.open(PortraitDialogComponent, {
                width: '600px',
                data: {
                    event: event,
                    // fileName: event.target.files[0].name,
                    responseType: this.responseType,
                },
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result !== '') {
                    this.delete = true;
                    this.src = result;
                    // console.log(result);
                    
                    this.srcChange.emit(result);
                }
            });
        } else {
            console.log(check.substring(0, 5));
            this.snackBar.openSnackBar('សូមជ្រើសរើស file ប្រភេទជារូបភាព', 'error');
        }
    }

    selectFile(): void {
        if (this.mode === 'READONLY') {
            return;
        }
        document.getElementById('portraitFile').click();
    }

}

// ===================================================================>> Dialog
@Component({
    templateUrl: 'portrait.dialog.component.html',
    styleUrls: ['./portrait.component.scss'],
})
export class PortraitDialogComponent {
    public result: any;
    public imageChangedEvent: any = '';

    constructor(
        public dialogRef: MatDialogRef<PortraitDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.imageChangedEvent = data.event;
    }

    close(): void {
        this.dialogRef.close('');
    }

    imageCropped(event: ImageCroppedEvent): any {
        if (this.data.responseType === 'base64') {
            this.result = event.base64 ? event.base64 : '';
        } else {
            // console.log(event);
            
            this.result = event;
        }
    }
    imageLoaded(): any {
        // show cropper
    }
    cropperReady(): any {
        // cropper ready
    }
    loadImageFailed(): any {
        // show message
    }
}
