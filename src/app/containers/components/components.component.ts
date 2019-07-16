import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from 'src/app/services/data-service.service';
import { saveAs } from "../../../../node_modules/file-saver";

import { Components } from 'src/app/models/component-model';

@Component({
	selector: 'app-components',
	templateUrl: './components.component.html',
	styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
	profile: any
	type: string = null;
	component: string = null;
	colours: string[] = [];
	selectedValue: string;
	constructor (private authService: AuthService, private data: DataService) {
		this.colours.push('red', 'green', 'blue');
	}

	async ngOnInit () {
		this.authService.profile.subscribe(profile => {
			if (profile) {
				this.profile = profile;
				return;
			}
			this.profile = null;
		})

	}

	// Type of components.
	chooseComponent (componentType: string) {
		this.type = componentType;

	}
	// The component of type.
	selectedComponent (component: string) {
		this.component = component;
	}

	onSelectedChange(value: string) {
		this.selectedValue = value;
	}
	apply () {
		// SEND TO SERVER
		const component = new Components(this.selectedValue)
		let fileName = this.component + ".js"
		//file type extension
		let checkFileType =  fileName.split('.').pop();
		var fileType;
		if(checkFileType == ".txt")
		{
		  fileType = "text/plain";
		}
		if(checkFileType == ".js")
		{
		  fileType = "text/js";
		}
		if(checkFileType == ".css")
		{
		  fileType = "text/css";
		}
		this.data.DownloadFile(component, this.component)
		.subscribe(
			success => {
				console.log(success);
					saveAs(success, this.component + checkFileType)
				  },
				  err => {
					  alert("Server error while downloading file.");
				  }
			  );
	}
}
