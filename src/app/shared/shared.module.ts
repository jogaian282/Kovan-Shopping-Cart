import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatCardModule,
        MatToolbarModule,
        CommonModule,
        HttpClientModule,
        MatBadgeModule,
        FlexLayoutModule,
        RouterModule,
        MatDividerModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatListModule
    ],
    exports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        CommonModule,
        HttpClientModule,
        MatListModule,
        FlexLayoutModule,
        RouterModule,
        MatTooltipModule,
        MatBadgeModule,
        MatDividerModule
    ]
})

export class SharedModule { }
