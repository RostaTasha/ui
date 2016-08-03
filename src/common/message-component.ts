import { Component, Input } from '@angular/core';

@Component({
	selector: 'message-component',
	template: `
		<div class="row">
		<div class=" col-sm-offset-4 col-sm-4">
			<div class="alert alert-danger">
				{{_message}}
			</div>
		</div>
		</div>
	`		
}
)
export class MessageComponent {
    'use strict';
	@Input() _message: string;
} 
