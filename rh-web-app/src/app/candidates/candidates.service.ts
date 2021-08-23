import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Candidates } from "./candidates.model";
import { Jobform } from "../posts/post.model";

@Injectable({providedIn: 'root'})
export class CandidatesService {
   private candidates: Candidates[] = [];
  n: any[] = [];
  a: any;
   constructor(private http: HttpClient, private router: Router) {}

/*
   getCandidatesnum(candidatesPerPage: number , currentPage: number,posts : Jobform[]){
     for(var i=0; i<=posts.length;i++){
         this.n[i]= posts[i].id;
         this.a = this.n[i];
         const queryParams = `?pagesize=${candidatesPerPage}&page=${currentPage}&postId=${this.a}`;
     }
    return this.http.get<{message:string,candidates: any, maxCandidates: number}>("http://localhost:3000/api/candidates/" + queryParams);
   } */
   getCandidates(candidatesPerPage: number , currentPage: number,postId: string){
    const queryParams = `?pagesize=${candidatesPerPage}&page=${currentPage}&postId=${postId}`; // adding the postid
    return this.http.get<{message:string,candidates: any, maxCandidates: number}>(
      "http://localhost:3000/api/candidates/" + queryParams).pipe(map((postData)=>{
        return {candidates: postData.candidates.map((candidat: any) => {
          return {
                  id: candidat._id,
                  email: candidat.email,
                  fullname: candidat.fullname,
                  cin: candidat.cin,
                  age: candidat.age
                 };
                }),
                maxCandidates: postData.maxCandidates
                };
               })
           )
  }

   addCandidat(email: string , fullname: string, cin: number, age: number, postId: string){
    /* const postData = new FormData();
    postData.append("jobtitle",jobtitle);
    postData.append("description",description);
    postData.append("skills", skills);
    postData.append("exp", exp); */
     const candidatData = {
        email : email,
        fullname: fullname,
        cin: cin,
        age: age,
        postId: postId
     }
     this.http.post<{message: string, candidat : Candidates}>('http://localhost:3000/api/candidates', candidatData)
     .subscribe((responseData)=> {
       this.router.navigate(["/"]);
     });
    }

    deleteCandidate(candidateId: string){
      return this.http
      .delete("http://localhost:3000/api/candidates/" + candidateId);
    }

  }