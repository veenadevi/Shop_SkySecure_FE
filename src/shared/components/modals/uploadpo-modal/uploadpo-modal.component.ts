import { Component,ElementRef,ViewChild} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-uploadpo-modal',
  templateUrl: './uploadpo-modal.component.html',
  styleUrls: ['./uploadpo-modal.component.css']
})
export class UploadpoModalComponent { 

  public productLogo: string;
  public tempAppArrayImgFiles = [];
  public tempAppList : any[] = [];
  removeUpload: boolean = false;
  showCompareProductModal: boolean = false;
  showUploadPoModal: boolean = false;
  dataForModal: any;
  modalType: string;
  myForm: FormGroup;
  submitted:any;

  @ViewChild('fileInput') el: ElementRef;
  imageURL: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
 

  constructor(
    public activeModal: NgbActiveModal, 
    private http: HttpClient,
    private fb: FormBuilder
  ){
    this.myForm = this.fb.group({})
  }
 
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageURL = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    console.log("saved Data",newFileList)
    console.log("saved Data", this.editFile )
    // this.myForm.patchValue({
    //   file: [null]
    // });
  }
  removeAppImage(index){
    
    this.tempAppList[index].imageURL = "";
  }

  saveUploadData(){

  }

  onSubmit(): any {
    this.submitted = true;
  }
  
  uploadFile(event: any) {
    
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
          
          this.productLogo = response.filePath;
         
          console.log("response.filePath",response.filePath)
        },
       
        error => {
          console.error('Upload error:', error);
         
        }
      );
  }
  removeFile() {
    this.productLogo = null;
    
  }
  
 uploadFileForApp(event : any){
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
         
          this.tempAppArrayImgFiles.push({ 
            'val' : response.filePath 
          })
          console.log(response.filePath); 
        },
        error => {
          console.error('Upload error:', error);
           
        }
      );
  }
 
  public closeModal(){
    this.activeModal.close();
  }
}
