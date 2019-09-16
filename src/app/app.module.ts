import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import json from 'highlight.js/lib/languages/json';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { CallbackComponent } from './containers/callback/callback.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ComponentsComponent } from './containers/components/components.component'

import { EnvironmentUrlService } from 'src/app/services/environment-url-service.service'
import { DataService } from 'src/app/services/data-service.service'
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { User } from './models/user-model';
export function hljsLanguages () {
	return [{ name: 'json', func: json }];
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavBarComponent,
		HeroComponent,
		CallbackComponent,
		LoadingComponent,
		ProfileComponent,
		ComponentsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		HighlightModule.forRoot({
			languages: hljsLanguages
		}),
		FontAwesomeModule
	],
	providers: [ EnvironmentUrlService, DataService, HttpClientModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
