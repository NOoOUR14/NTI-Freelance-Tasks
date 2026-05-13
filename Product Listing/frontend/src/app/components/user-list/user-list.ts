import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe();
  }

  onDelete(id: string | undefined): void {
    if (id && confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe();
    }
  }
}
