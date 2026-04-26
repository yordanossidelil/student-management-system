import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  total = 0;
  page = 1;
  limit = 10;
  search = '';
  loading = false;
  error = '';

  private searchSubject = new Subject<string>();

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.page = 1;
        this.search = term;
        this.loadStudents();
      });
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getStudents(this.search, this.page, this.limit).subscribe({
      next: (res) => {
        this.students = res.students;
        this.total = res.total;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load students.';
        this.loading = false;
      },
    });
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  delete(id: string) {
    if (!confirm('Delete this student?')) return;
    this.studentService.deleteStudent(id).subscribe({
      next: () => this.loadStudents(),
      error: () => (this.error = 'Failed to delete student.'),
    });
  }

  get totalPages() {
    return Math.ceil(this.total / this.limit);
  }

  changePage(p: number) {
    this.page = p;
    this.loadStudents();
  }
}
