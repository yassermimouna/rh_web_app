import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CandidatesService } from '../candidates.service';
import { PostsService } from 'src/app/posts/posts.service';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {
  form: any;
  post: any;
  job= '';
  private postId: any;
  isLoading = false;
  constructor(
    public postsService: PostsService,
    public candidatesService: CandidatesService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: []
      }),
      fullname: new FormControl(null, {
        validators: []
      }),
      cin: new FormControl(null, {
        validators: []
      }),
      age: new FormControl(null, {
        validators: []
      })
     });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
          this.postId = paramMap.get('postId');
          this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            jobtitle: postData.jobtitle,
            description: postData.description,
            skills: postData.skills,
            exp: postData.exp,
            creator: postData.creator
          };
          /* console.log(this.post.jobtitle); */
          this.job = this.post.jobtitle;

        });
      }
    });
  }

  onApply(){
  if(this.form.invalid) {
      return;
    }else {
      this.candidatesService.addCandidat(
        this.form.value.email,
        this.form.value.fullname,
        this.form.value.cin,
        this.form.value.age,
        this.postId
      );
    }
    this.form.reset();
  }





}
