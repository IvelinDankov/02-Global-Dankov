import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appContainer]",
})
export class ContainerDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /*    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      '#5f5f5f'
    ); */

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, "margin-botton", "0");
  }
}
