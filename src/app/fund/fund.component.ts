import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { FundService } from '../_services/fund.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  projects: any;
  members: any;
  currentProject = null;
  currentIndex = -1;
  title = '';
  fundForm: FormGroup;

  
  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService, 
    private fundService: FundService) { 
      this.fundForm = this.formBuilder.group({
        fund: this.formBuilder.array([])
      });
    
    }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  funds(): FormArray {
    return this.fundForm.get("fund") as FormArray
  }

  retrieveProjects(): void {
    this.projectService.getAll()
      .subscribe(
        response => {
          this.projects = response.data;
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveProjects();
    this.currentProject = null;
    this.currentIndex = -1;
  }

  setActiveProject(project, index): void {
    this.currentProject = project;
    this.currentIndex = index;
    this.projectService.getMember(this.currentProject.id)
      .subscribe(
        response => {
          this.members = response.data;
          for (let fund of this.members) {
            this.funds().push(this.formBuilder.group({
              displayName: fund.displayName,
              email: fund.email,
              jobTitle: fund.jobTitle.name,
              monthlyAmount: fund.jobTitle.monthlyAmount
            }))
            console.log(fund)
          }
        },
        error => console.log(error),       
      );
  }
  completeFund(): void {
    const selectedOrderIds = this.fundForm.value.orders
      .map((checked, i) => checked ? this.funds[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }
}