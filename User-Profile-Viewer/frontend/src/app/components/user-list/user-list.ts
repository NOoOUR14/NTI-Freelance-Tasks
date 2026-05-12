import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe();
  }

  updateSearch(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.userService.searchTerm.set(element.value);
  }
}
