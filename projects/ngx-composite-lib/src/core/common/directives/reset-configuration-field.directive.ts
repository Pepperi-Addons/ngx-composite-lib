import { Directive, HostListener, ElementRef, AfterViewInit, TemplateRef, ViewContainerRef, Renderer2, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepSizeType, PepStyleStateType, PepStyleType } from '@pepperi-addons/ngx-lib';

@Directive({
    selector: '[pepResetConfigurationField]',
    
})
export class PepResetConfigurationFieldDirective implements AfterViewInit, OnDestroy {
    @Input('pepResetConfigurationField') resetFieldKey: string = '';
    @Input() resetHostEvents: EventEmitter<any> = new EventEmitter();
    

    // TODO: Change to disabled?
    private readonly hiddenClassName = 'hidden';
    private _resetHidden: boolean = false;
    @Input() 
    set resetHidden(value: boolean) {
        this._resetHidden = value;
        
        if (value) {
            this.renderer.addClass(this.buttonContainer, this.hiddenClassName);
        } else {
            this.renderer.removeClass(this.buttonContainer, this.hiddenClassName);
        }
    }
    get resetHidden(): boolean {
        return this._resetHidden;
    }

    @Input() resetPosition: 'top-end' | 'bottom-end' = 'top-end';

    styleType: PepStyleType = 'weak';
    styleStateType: PepStyleStateType = 'system';
    sizeType: PepSizeType = 'sm';
    
    private unlistener: (() => void) | undefined;
    private buttonContainer!: HTMLDivElement;

    constructor(
        private renderer:Renderer2,
        private element: ElementRef,
        private translate: TranslateService) {
        this.buttonContainer = this.renderer.createElement('div');
    }

    private setButtonContainerStyle() {
        let css = `
            position: relative;
            width: inherit;
            display: flex;
            justify-content: flex-end;
            ${this.resetHidden ? 'display: none;' : ''}
            ${this.resetPosition === 'top-end' ? 'margin-top:' : 'margin-bottom:'} 1.5rem;
        `;

        this.buttonContainer.setAttribute("style", css);
    }

    private setButtonStyle(button: HTMLButtonElement) {
        let css = `
            position: absolute !important;
            display: flex !important;
            align-items: center !important;
            height: 1rem !important;
            line-height: unset !important;
            border-radius: 0.5rem !important;
            padding-inline: 0.75rem !important;
            ${this.resetPosition === 'top-end' ? 'top:' : 'bottom:'} -1.25rem;
        `;

        button.setAttribute("style", css);
    }

    private async getResetElement(): Promise<HTMLElement> {
        this.setButtonContainerStyle();
        // this.renderer.addClass(this.buttonContainer, 'reset-configuration-field-container');
        this.renderer.addClass(this.buttonContainer, this.resetPosition);

        const button: HTMLButtonElement = this.renderer.createElement('button');
        await this.translate.get('ACTIONS.RESET').toPromise().then(resetText => {
            const buttonText = this.renderer.createText(resetText);
            this.renderer.appendChild(button, buttonText);
        });
        
        this.renderer.addClass(button, 'pep-button');
        this.renderer.addClass(button, this.styleType);
        this.renderer.addClass(button, this.styleStateType);
        this.renderer.addClass(button, this.sizeType);
        this.setButtonStyle(button);
        // this.renderer.addClass(button, 'reset-configuration-field-button');
        
        this.unlistener = this.renderer.listen(button, 'click', () => this.onResetClicked());
        
        this.renderer.appendChild(this.buttonContainer, button);

        return this.buttonContainer;
    }

    ngAfterViewInit(): void {
        this.getResetElement().then(element => {
            if (this.resetPosition === 'top-end' && this.element.nativeElement.children?.length > 0) {
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
        this.resetHostEvents.emit({
            action: 'set-configuration-field',
            key: this.resetFieldKey,
            value: undefined
        });
    }
}
