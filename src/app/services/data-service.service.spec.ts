import { TestBed } from '@angular/core/testing';

import { DataService } from './data-service.service';
import { EnvironmentUrlService } from "./environment-url-service.service";
import { HttpClientModule } from '@angular/common/http';



describe('DataService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [ EnvironmentUrlService ]
		});

	});

	it('should be created', () => {
		const service: DataService = TestBed.get(DataService);
		expect(service).toBeTruthy();
	});

});
