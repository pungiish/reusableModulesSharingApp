import { TestBed, getTestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';

import { WidgetService } from './widget-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentUrlService } from './environment-url-service.service'
import { Widget } from '../models/widget-model';
import { User } from '../models/user-model';
import { of } from 'rxjs';

describe('WidgetServiceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({

			imports: [HttpClientTestingModule],
			providers: [WidgetService]
		})
	});
	it('should be created', () => {
		const service: WidgetService = TestBed.get(WidgetService);
		expect(service).toBeTruthy();
	});

	it(
		'should perform login correctly',
		fakeAsync(
		  inject(
			[WidgetService, HttpTestingController, EnvironmentUrlService],
			(widgetService: WidgetService, backend: HttpTestingController, env: EnvironmentUrlService) => {
				const user: User = new User("pungarsek.jan@gmail.com", "Jan Pun", "Pun", "google-oauth2|114057071107576927043", null);
				const expectedWidgets: Widget[] =
					[{
						Id: "4130f926-5ed8-4332-be74-00d4721c7880",
						Tag: "<element-el></element-el>",
						Colour: "Red",
						Text: null,
						Name: "bo",
						UserId: "pungarsek.jan@gmail.com"
					}];
			  let response = null;
			  // End Setup

			  widgetService.read(user).subscribe(
				(receivedResponse: Widget) => {
					  response = receivedResponse;
					  expect(response).toEqual(expectedWidgets)
				},
				(error: any) => {}
			  );

			  const requestWrapper = backend.expectOne({url: env.url + '/widgets/' + user.Email});
			  tick();
			  expect(requestWrapper.request.method).toEqual('GET');
					}
		  )
		)
	  );
});

