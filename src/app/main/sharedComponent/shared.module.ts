import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, navToolbar } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    NavbarComponent,
    navToolbar,
    FooterComponent,
    ToolbarComponent,
    
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MaterialModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    ToolbarComponent,
    navToolbar
  ]
})
export class SharedModule { }
