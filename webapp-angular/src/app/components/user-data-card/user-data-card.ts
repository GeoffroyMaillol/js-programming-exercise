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
  @Input({ required: true }) delay: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.el.nativeElement.style.animationDelay = `${this.delay}ms`;
    this.renderer.removeClass(this.el.nativeElement, 'animate');
    this.renderer.addClass(this.el.nativeElement, 'animate'); // add class again to trigger animation
  }
}
