import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userForm!: FormGroup;
  isEditMode = false;
  userId: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.isEditMode = true;
      this.userService.getUser(this.userId).subscribe(res => {
        this.userForm.patchValue(res.data);
      });
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      bio: ['', Validators.required],
      skills: [''] 
    });
  }

  onSubmit(): void {
  if (this.userForm.invalid) return;

  const formData = this.userForm.value;

  if (this.isEditMode && this.userId) {
    this.userService.updateUser(this.userId, formData).subscribe(() => {
      this.router.navigate(['/']);
    });
  } else {
    this.userService.createUser(formData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
  }

