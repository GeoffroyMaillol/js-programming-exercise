import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { UserData } from '../../types/UserData';

@Component({
  selector: 'app-user-data-card',
  standalone: true,
  imports: [],
  templateUrl: './user-data-card.html',
  styleUrls: ['./user-data-card.css'],
})
export class UserDataCard {
  @Input({ required: true }) userData!: UserData;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.renderer.removeClass(this.el.nativeElement, 'animate');
    void this.el.nativeElement.offsetWidth; // force reflow
    this.renderer.addClass(this.el.nativeElement, 'animate'); // add class again to trigger animation
  }

}
