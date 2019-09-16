import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule } from 'ngx-highlightjs';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { hljsLanguages } from './app.module';
import { HeroComponent } from './components/hero/hero.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CallbackComponent } from './containers/callback/callback.component';
import { HomeComponent } from './containers/home/home.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ComponentsComponent } from './containers/components/components.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FontAwesomeModule,
				HighlightModule.forRoot({
					languages: hljsLanguages
				}),
				NgbModule,
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule.withRoutes(routes)
			],
			declarations: [
				AppComponent,
				CallbackComponent,
				HeroComponent,
				HomeComponent,
				LoadingComponent,
				NavBarComponent,
				ProfileComponent,
				ComponentsComponent
			],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have the correct title`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('Angular Sample Project');
	});

});
