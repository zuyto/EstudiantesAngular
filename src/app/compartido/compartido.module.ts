import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { APP_ROUTING } from '../app.router';






@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent

  ],
  imports: [
    CommonModule,
    APP_ROUTING
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
    ]
})
export class CompartidoModule { }
