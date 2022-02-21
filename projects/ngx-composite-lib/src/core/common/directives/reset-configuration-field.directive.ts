import { Directive, HostListener, ElementRef, AfterViewInit, TemplateRef, ViewContainerRef, Renderer2, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepSizeType, PepStyleStateType, PepStyleType } from '@pepperi-addons/ngx-lib';

@Directive({
    selector: '[pepResetConfigurationField]',
})
export class PepResetConfigurationFieldDirective implements AfterViewInit, OnDestroy {
    @Input() fieldKey = '';
    @Input() hostEvents: EventEmitter<any> = new EventEmitter();
    
    private readonly hidenClassName = 'hidden';
    private _hidden: boolean = false;
    @Input() 
    set hidden(value: boolean) {
        this._hidden = value;
        
        if (value) {
            this.renderer.addClass(this.buttonContainer, this.hidenClassName);
        } else {
            this.renderer.removeClass(this.buttonContainer, this.hidenClassName);
        }
    }
    get hidden(): boolean {
        return this._hidden;
    }

    @Input() position: 'top-end' | 'bottom-end' = 'top-end';

    @Input() styleType: PepStyleType = 'weak';
    @Input() styleStateType: PepStyleStateType = 'system';
    @Input() sizeType: PepSizeType = 'md';
    
    private unlistener: (() => void) | undefined;
    private buttonContainer!: HTMLDivElement;

    constructor(
        private renderer:Renderer2,
        private element: ElementRef,
        private translate: TranslateService) {
        this.buttonContainer = this.renderer.createElement('div');
    }

    private async getResetElement(): Promise<HTMLElement> {
        this.renderer.addClass(this.buttonContainer, 'reset-configuration-field-container');

        const button: HTMLButtonElement = this.renderer.createElement('button');
        await this.translate.get('ACTIONS.RESET').toPromise().then(resetText => {
            const buttonText = this.renderer.createText(resetText);
            this.renderer.appendChild(button, buttonText);
        });
        
        this.renderer.addClass(button, 'pep-button');
        this.renderer.addClass(button, this.styleType);
        this.renderer.addClass(button, this.styleStateType);
        this.renderer.addClass(button, this.sizeType);
        this.renderer.addClass(button, this.position);
        this.renderer.addClass(button, 'reset-configuration-field-button');
        
        this.unlistener = this.renderer.listen(button, 'click', () => this.onResetClicked());
        
        this.renderer.appendChild(this.buttonContainer, button);

        return this.buttonContainer;
    }

    ngAfterViewInit(): void {
        this.getResetElement().then(element => {
            if (this.position === 'top-end' && this.element.nativeElement.children?.length > 0) {
                this.renderer.insertBefore(this.element.nativeElement, element, this.element.nativeElement.children[0]);
            } else {
                this.renderer.appendChild(this.element.nativeElement, element);
            }
        });

    }

    ngOnDestroy() {
        if (this.unlistener) {
            this.unlistener();
        }
    }

    onResetClicked() {
        this.hostEvents.emit({
            action: 'set-configuration-field',
            key: this.fieldKey,
            value: undefined
        });
    }
}
