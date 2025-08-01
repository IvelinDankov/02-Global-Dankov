import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appPrice]",
})
export class PriceDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, "color", "#569e7b");
    this.renderer.setStyle(this.el.nativeElement, "fontWeight", "bold");
    this.renderer.setStyle(this.el.nativeElement, "fontSize", "2.2rem");
  }
}
