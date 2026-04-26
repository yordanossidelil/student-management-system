import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  totalStudents = 0;
  departments: Record<string, number> = {};

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents('', 1, 1000).subscribe((res) => {
      this.totalStudents = res.total;
      res.students.forEach((s) => {
        this.departments[s.department] = (this.departments[s.department] || 0) + 1;
      });
    });
  }

  get departmentEntries() {
    return Object.entries(this.departments);
  }
}
