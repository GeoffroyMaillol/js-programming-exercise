import { Component, Input } from '@angular/core';
import { UserData } from '../../types/UserData';

@Component({
  selector: 'app-user-data-card',
  standalone: true,
  imports: [],
  templateUrl: './user-data-card.html',
  styleUrl: './user-data-card.css',
})
export class UserDataCard {
  @Input({ required: true }) userData!: UserData;
}
