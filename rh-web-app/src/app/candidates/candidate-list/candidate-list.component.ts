import { Component , OnDestroy, OnInit} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { Candidates } from "../candidates.model";
import { CandidatesService } from "../candidates.service";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidates: Candidates[] = [];
  isLoading = false;
  currentPage = 1;
  totalcandidates = 0;
  candidatesPerPage= 2;
  constructor(public candidatesService: CandidatesService) { }

  ngOnInit(){
    this.isLoading = true;
     this.candidatesService.getCandidates(this.candidatesPerPage,this.currentPage);
  }
}
