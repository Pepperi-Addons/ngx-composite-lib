import { Directive, HostListener, ElementRef, AfterViewInit, TemplateRef, ViewContainerRef, Renderer2, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepSizeType, PepStyleStateType, PepStyleType } from '@pepperi-addons/ngx-lib';
import { PepIconService, pepIconDeviceResponsive } from '@pepperi-addons/ngx-lib/icon';


@Directive({
    selector: '[pepResetConfigurationField]',
})
export class PepResetConfigurationFieldDirective implements AfterViewInit, OnDestroy {
    @Input('pepResetConfigurationField') resetFieldKey = '';
    @Input() resetHostEvents: EventEmitter<any> = new EventEmitter();
    
    private _disabled = false;
    @Input() 
    set disabled(value: boolean) {
        this._disabled = value;
        // this.renderer.setStyle(this.buttonContainer, 'visibility', this.getVisibility());
        this.setButtonStyle(this.resetButton);
    }
    get disabled(): boolean {
        return this._disabled;
    }

    private _hideReset = false;
    @Input() 
    set hideReset(value: boolean) {
        this._hideReset = value;
        // this.renderer.setStyle(this.buttonContainer, 'visibility', this.getVisibility());
        this.setButtonStyle(this.resetButton);
    }
    get hideReset(): boolean {
        return this._hideReset;
    }

    private _dir: 'rtl' | 'ltr' = 'ltr';
    @Input() 
    set dir(value: 'rtl' | 'ltr') {
        this._dir = value;
        this.renderer.setStyle(this.buttonContainer, 'float', this.getFloat());
    }
    get dir(): 'rtl' | 'ltr' {
        return this._dir;
    }

    // styleType: PepStyleType = 'weak';
    // styleStateType: PepStyleStateType = 'system';
    sizeType: PepSizeType = 'sm';
    resetPosition = 'bottom-end';
    
    private unlistener: (() => void) | undefined;
    private buttonContainer!: HTMLDivElement;
    private resetButton!: HTMLButtonElement;

    constructor(
        private renderer:Renderer2,
        private element: ElementRef,
        private pepIconService: PepIconService,
        private translate: TranslateService) {
        // Create the buton container.
        this.buttonContainer = this.renderer.createElement('div');

        this.translate.get('GENERAL.RESET_HINT').toPromise().then(hint => {
            this.renderer.setAttribute(this.buttonContainer, 'title', hint);
        });
    }

    private getVisibility() {
        return this.disabled || this.hideReset ? 'hidden' : 'visible';
    }

    private getFloat() {
        return this.dir === 'rtl' ? 'left' : 'right';
    }

    private setButtonContainerStyle() {
        const css = `
            display: flex;
            justify-content: flex-end;
            `;
            
        // This was removed.
        // float: ${this.getFloat()};
        // margin-bottom: 1rem;

        this.buttonContainer.setAttribute("style", css);
    }

    private setButtonStyle(button: HTMLButtonElement) {
        if (button) {
            const css = `
                display: flex !important;
                align-items: center !important;
                height: 1rem !important;
                line-height: unset !important;
                padding: unset !important;
                background: unset !important;
                font-size: var(--pep-button-2xs-font-size) !important;
                visibility: ${this.getVisibility()};
            `;
    
            button.setAttribute("style", css);
        }
    }

    private setSvgStyle(svg: SVGElement) {
        const css = `
            transform: rotate(270deg);
            width: 0.75rem;
        `;
        svg.setAttribute('style', css);
    }

    private async getResetElement(): Promise<HTMLElement> {
        this.setButtonContainerStyle();
        this.renderer.addClass(this.buttonContainer, 'pep-reset-configuration-field-container');

        // Append button
        this.resetButton = this.renderer.createElement('button');
        await this.translate.get('ACTIONS.RESET').toPromise().then(resetText => {
            const buttonText = this.renderer.createText(resetText);
            this.renderer.appendChild(this.resetButton, buttonText);
        });
        
        this.renderer.addClass(this.resetButton, 'pep-button');
        // this.renderer.addClass(button, this.styleType);
        // this.renderer.addClass(button, this.styleStateType);
        this.renderer.addClass(this.resetButton, 'color-link');
        this.renderer.addClass(this.resetButton, this.sizeType);
        this.setButtonStyle(this.resetButton);
        // this.renderer.addClass(button, 'reset-configuration-field-button');
        
        this.unlistener = this.renderer.listen(this.resetButton, 'click', () => this.onResetClicked());
        
        this.renderer.appendChild(this.buttonContainer, this.resetButton);

        // Append svg
        const svgIcon = this.pepIconService.getSvgIcon(pepIconDeviceResponsive.name);
        this.setSvgStyle(svgIcon);
        this.renderer.appendChild(this.buttonContainer, svgIcon);

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
