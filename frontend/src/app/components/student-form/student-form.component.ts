import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  studentId = '';
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      studentId: ['', [Validators.required, Validators.pattern(/^STU\d{3,}$/i)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1), Validators.max(6)]],
      gpa: [null, [Validators.min(0), Validators.max(4)]],
      phone: [null, Validators.pattern(/^[+]?[\d\s\-().]{7,15}$/)],
    });

    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    if (this.studentId) {
      this.isEdit = true;
      this.studentService.getStudent(this.studentId).subscribe({
        next: (s) => this.form.patchValue(s),
        error: () => (this.error = 'Failed to load student.'),
      });
    }
  }

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const action = this.isEdit
      ? this.studentService.updateStudent(this.studentId, this.form.value)
      : this.studentService.createStudent(this.form.value);

    action.subscribe({
      next: () => this.router.navigate(['/students']),
      error: (err) => {
        this.error = err.error?.message || 'Operation failed.';
        this.loading = false;
      },
    });
  }
}
