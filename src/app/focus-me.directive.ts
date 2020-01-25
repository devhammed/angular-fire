import { OnInit, ElementRef, Renderer, Input, Directive } from '@angular/core'

@Directive({
  selector: '[appFocusMe]'
})
export class FocusMeDirective implements OnInit {
  @Input('appFocusMe') isFocused: boolean

  constructor(private hostElement: ElementRef, private renderer: Renderer) {}

  ngOnInit() {
    if (this.isFocused) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus')
    }
  }
}
