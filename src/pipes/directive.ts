import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';

@Directive({ selector: '[eleselect]' })
export class ElesltDirective {
    //deubgger;
    private _domElem: ElementRef;
    private _renderer: Renderer;
    constructor(
        elem: ElementRef,
        renderer: Renderer,
        // private _templateRef: TemplateRef,
        // private _viewContainer: ViewContainerRef
    ) {
        this._domElem = elem.nativeElement
        this._renderer = renderer;
    }
    // @HostListener('click')
    // onclick() {
    //     let itemss = this._domElem;
    //     this._renderer;
    // }

    // @Input() set myUnless(condition: boolean) {
    //     //deubgger;
    //     if (!condition) {
    //         this._viewContainer.createEmbeddedView(this._templateRef);
    //     } else {
    //         this._viewContainer.clear();
    //     }
    // }
}

@Directive({ selector: '[highlight]' })
/** Highlight the attached element in gold */
export class HighlightDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'gold';
        console.log(
            `* AppRoot highlight called for ${el.nativeElement.tagName}`);
    }
}

// @Directive({ selector: '[mystarselect]' })
// /** Highlight the attached element in gold */
// export class starDirective {
//     constructor() { 
//     }
// }

// @Directive({
//     selector: '[prefixHightlight]'
// })
// export class HighlightDirective {

//     private _domElem: ElementRef;
//     private _renderer: Renderer;

//     constructor(elem: ElementRef, renderer: Renderer) {
//         this._domElem = elem.nativeElement
//         this._render = renderer;
//         //renderer.setElementStyle(elem.nativeElement, 'backgroundColor', 'red');
//     }

//     @HostListener('mouseenter')
//     onMouseEnter() {
//         this._render.setElementStyle(this._domElem, 'backgroundColor', 'red');
//     }

//     @HostListener('mouseleave')
//     onMouseLeave() {
//         this._render.setElementStyle(this.domElem, 'backgroundColor', null);
//     }
// }