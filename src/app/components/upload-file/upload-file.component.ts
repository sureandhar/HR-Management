import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.css"],
})
export class UploadFileComponent implements OnInit {
  public message: string;
  public progress: number;
  public pathFordb: any;

  //emitter property for sending stored path
  @Output() public storedPath = new EventEmitter();
  constructor(private http: HttpClient) {}

  //getting values over selector
  @Input() public username: string;

  ngOnInit(): void {}

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    console.log(this.username);
    var param = "?username=" + this.username;
    this.http
      .post("https://localhost:44358/api/upload" + param, formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        // console.log(event);

        if (event.type === HttpEventType.UploadProgress) {
          //to set current progress %
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = "Upload Success.";
          //this.onUploadFinished.emit(event.body);
          this.pathFordb = JSON.parse(JSON.stringify(event.body)).dbPath;
          this.storedPath.emit(this.pathFordb);
          console.log(this.pathFordb);
        }
      });
  };
}
