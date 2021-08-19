import { Component, OnInit} from "@angular/core";
import { FormControl, FormGroup , Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostsService } from "../posts.service";

import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: any;
  isLoading = false;
  form: any;
  imagePreview:string | ArrayBuffer | null ='';
  private mode ='create';
  private postId: any;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
    ) {}

  ngOnInit(){
    /* this.form = new FormGroup ({
        title : new FormControl(null, {
          validators: [Validators.required,Validators.minLength(3)]}),

        content: new FormControl(null, {validators : [Validators.required]}),
        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
    }); */

    this.form = new FormGroup({
      jobtitle: new FormControl(null, {
        validators: []
      }),
      description: new FormControl(null, {
        validators: []
      }),
      skills: new FormControl(null, {
        validators: []
      }),
      exp: new FormControl(null, {
        validators: []
      }),

  });

      this.route.paramMap.subscribe((paramMap: ParamMap) =>{
        if (paramMap.has('postId')){
           this.mode = 'edit';
           this.postId = paramMap.get('postId');
           this.isLoading = true;
           this.postsService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
             this.post = {
               id : postData._id,
               jobtitle: postData.jobtitle,
               description: postData.description,
               skills: postData.skills,
               exp: postData.exp,
               creator: postData.creator
              };
            this.form.setValue({
               jobtitle: this.post.jobtitle,
               description: this.post.description,
               skills: this.post.skills,
               exp: this.post.exp
              });
           });
        } else {
          this.mode ='create';
          this.postId = "";
        }
      });
  }

 /*  onImagePicked(event: Event) {
    let htmlFiles = (event.target as HTMLInputElement).files;
    let file : Blob = new Blob();
    if (htmlFiles != null) {
      file = htmlFiles[0];
    }
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  } */
  onSavepost(){
     if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postsService.addPost(
        this.form.value.jobtitle,
        this.form.value.description,
        this.form.value.skills,
        this.form.value.exp
        );
    }else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.jobtitle,
        this.form.value.description,
        this.form.value.skills,
        this.form.value.exp
        );
    }
    this.form.reset();
  }
}
