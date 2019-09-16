import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';


import { NavBarComponent } from './nav-bar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ComponentsComponent } from 'src/app/containers/components/components.component';
import { ProfileComponent } from 'src/app/containers/profile/profile.component';

describe('NavBarComponent', () => {
	let component: NavBarComponent;
	let fixture: ComponentFixture<NavBarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NavBarComponent],
			imports: [NgbModule, RouterTestingModule.withRoutes(
				[{path: '', component: HeroComponent},{path: '/profile', component: ProfileComponent}, {path: '/components', component: ComponentsComponent}]
			), faUser, faPowerOff],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NavBarComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
