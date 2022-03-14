import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { JoueurComponent } from './joueur/joueur.component';
import { TerrainComponent } from './terrain/terrain.component';
import { DisplayPositionComponent } from './display-position/display-position.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ModifPositionComponent } from './modif-position/modif-position.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LegendeTerrainComponent } from './terrain/legende-terrain/legende-terrain.component';
import { PromptJoueurComponent } from './joueur/prompt-joueur/prompt-joueur.component';
import { SystemeViewComponent } from './view/systeme-view/systeme-view.component';
import { TerrainListComponent } from './systeme/terrain-list/terrain-list.component';
import { TerrainItemComponent } from './systeme/terrain-item/terrain-item.component';
import { EventsMatchComponent } from './agenda/events-match/events-match.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list'; // a plugin!
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { ResultComponent } from './resultat/result/result.component';// a plugin!
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: 'view/position',component:DisplayPositionComponent},
  {path: 'view/systeme',component:SystemeViewComponent},
  {path: 'calendar/events', component:EventsMatchComponent},
  {path: 'resultat', component:ResultComponent},
  {path: 'auth/login', component:LoginFormComponent},
  {path: 'modif',canActivate: [AuthGuardService], component:ModifPositionComponent},
  {path: '', redirectTo: '/view/position',pathMatch:'full'}
]

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  listPlugin,
  googleCalendarPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ControlPanelComponent,
    JoueurComponent,
    TerrainComponent,
    DisplayPositionComponent,
    ModifPositionComponent,
    LoginFormComponent,
    LegendeTerrainComponent,
    PromptJoueurComponent,
    SystemeViewComponent,
    TerrainListComponent,
    TerrainItemComponent,
    EventsMatchComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    DragDropModule,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
