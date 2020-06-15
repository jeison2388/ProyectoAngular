import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg.length<3) return value;
    const resultPost=[];
    for(const post of value)
    {
      if(post.nombre!=null && post.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1) 
          resultPost.push(post);
      if(post.delegado!=null &&(post.delegado.toLowerCase().indexOf(arg.toLowerCase())>-1))        
          resultPost.push(post);        
    }
    return resultPost;
    
  }
}
  