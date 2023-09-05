import { Component,ViewChild ,ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review-final-page',
  templateUrl: './review-final-page.component.html',
  styleUrls: ['./review-final-page.component.css']
})
export class ReviewFinalPageComponent {
  registrationForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.registrationForm = this.fb.group({
      file: [null],
    })
 
  }
  public productLogo: string;
  public fileToUpload: File | null = null;

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any;
  editFile: boolean = true;
  removeUpload: boolean = false;


  uploadFile(event: any) {
    // console.log("__TEST__", event);
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
          // console.log('Upload successful', response);
          this.productLogo = response.filePath;
          // Handle the response from the server
        },
        error => {
          console.error('Upload error:', error);
          // Handle the error response
        }
      );
  }

  removeImage() {
    this.productLogo = null;
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }

}


