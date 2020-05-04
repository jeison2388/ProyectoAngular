import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';

// enable ripple style
enableRipple(true);

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'app-timePicker',
    template: `
        <ejs-timepicker [placeholder]='watermark' [format]='formatString' [step]='interval' ></ejs-timepicker>
        `
})

export class MyTimePickerComponent {
    public watermark: string = 'Select a time';
    // sets the format property to display the time value in 24 hours format.
    public formatString: string = 'HH:mm';
    public interval: number = 60;

    constructor() {
    }
}
