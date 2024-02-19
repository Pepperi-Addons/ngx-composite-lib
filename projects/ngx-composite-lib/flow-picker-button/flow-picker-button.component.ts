import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { PepStyleType } from '@pepperi-addons/ngx-lib';
import { PepAddonBlockLoaderService } from '@pepperi-addons/ngx-lib/remote-loader';
import { FlowPickerService } from './flow-picker-button.service';

@Component({
    selector: 'pep-flow-picker-button',
    templateUrl: './flow-picker-button.component.html',
    styleUrls: ['./flow-picker-button.component.scss']
})
export class FlowPickerButtonComponent implements OnInit {

    private _flowHostObject: any = undefined;
    @Input()
    set flowHostObject(value: any) {
        this._flowHostObject = value;
        
        // If there is a flow key - search for the flow name.
        if (value?.runFlowData?.FlowKey) {
            this.setChoosenFlow(value.runFlowData.FlowKey);
        } else {
            this.initChoosenFlow('');
        }
    }
    get flowHostObject(): any {
        return this._flowHostObject;
    }

    @Input() disabled = false;
    @Input() styleType: PepStyleType = 'weak';
    
    @Output()
    flowChange: EventEmitter<any> = new EventEmitter<any>();
    
    protected choosenFlowName = '';
    protected choosenFlowKey = '';

    constructor(
        private viewContainerRef: ViewContainerRef,
        private addonBlockLoaderService: PepAddonBlockLoaderService, 
        private flowPickerService: FlowPickerService) { }

    private initChoosenFlow(flowKey: string) {
        this.choosenFlowKey = flowKey;
        this.choosenFlowName = '';
    }

    private setChoosenFlow(flowKey: string) {
        // If this is not the same flow key
        if (this.choosenFlowKey !== flowKey) {
            this.initChoosenFlow(flowKey);
    
            // Search for the flow name.
            this.flowPickerService.searchFlows(flowKey).then(flows => {
                if (flows?.Objects?.length > 0) {
                    this.choosenFlowName = flows.Objects[0].Name || undefined;
                }
            });
        }
    }

    ngOnInit() {
        // Do nothing.
    }

    openFlowPickerDialog() {
        const dialogRef = this.addonBlockLoaderService.loadAddonBlockInDialog({
            container: this.viewContainerRef,
            name: 'FlowPicker',
            size: 'large',
            hostObject: this.flowHostObject,
            hostEventsCallback: async (event) => {
                if (event.action === 'on-done') {
                    // If flow key exist - search for the flow name.
                    if (event.data?.FlowKey) {
                        this.setChoosenFlow(event.data.FlowKey);
                        this.flowChange.emit(event.data);
                    } else {
                        this.initChoosenFlow('');
                        this.flowChange.emit(null);
                    }

                    dialogRef?.close();
                } else if (event.action === 'on-cancel') {
                    dialogRef?.close();
                }
            }
        });
    }
}
