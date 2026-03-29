import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImage : BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    filename: '',
    title: '',
    fileExtension: '',
    url: ''
  });

  constructor(private http : HttpClient) { }

  GetAllImages() : Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apibaseurl}/api/images`);
  }

  UploadImage(file: File, filename: string, title: string) :Observable<BlogImage> {
    const formData = new FormData();  
    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('title', title);

    return this.http.post<BlogImage>(`${environment.apibaseurl}/api/images`, formData);
  }
  SelectImage(image: BlogImage) : void {
    this.selectedImage.next(image);
  }
  onSelectImage() : Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
  
}
