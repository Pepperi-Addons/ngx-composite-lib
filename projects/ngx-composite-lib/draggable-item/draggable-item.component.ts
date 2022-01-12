import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'pep-draggable-item',
    templateUrl: './draggable-item.component.html',
    styleUrls: ['./draggable-item.component.scss']
})
export class DraggableItemComponent implements OnInit {

    @HostBinding('style.cursor') _cursor = 'move';

    @Input() title = '';
    
    @Input() disabled = false;

    // private _isDraggable = false;
    // @Input()
    // set isDraggable(value: boolean) {
    //     this._isDraggable = value;

    //     this._cursor = value ? 'move' : 'inherit'
    // }
    // get isDraggable(): boolean {
    //     return this._isDraggable;
    // }

    constructor() { 
        //
    }

    ngOnInit(): void {
        //
    }
}
