import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appHover]",
})
export class HoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      "boxShadow",
      "0 4px 8px black"
    );
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      "boxShadow",
      "0 1px 3px rgba(0,0,0,0.5)"
    );
  }
}
