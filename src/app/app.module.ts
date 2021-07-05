import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaComponent } from './tela/tela.component';
import { PlayComponent } from './play/play.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StylesDirective } from './directives/styles.directive';

@NgModule({
  declarations: [
    AppComponent,
    TelaComponent,
    PlayComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    StylesDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
