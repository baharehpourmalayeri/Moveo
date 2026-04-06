import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-account.html',
})
export class UserAccount implements OnInit {
  profileForm: FormGroup;
  profileImageUrl: string | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: [''],
      newPassword: [''],
      confirmNewPassword: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const user = {
      name: 'Bahareh Pm',
      email: 'bahareh@example.com',
      profileImage: 'assets/coach/2.jpg',
    };
    this.profileForm.patchValue({
      name: user.name,
      email: user.email,
    });
    this.profileImageUrl = user.profileImage;
  }
}
