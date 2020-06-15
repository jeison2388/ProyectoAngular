import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeCompetition'
})
export class PipeCompetitionPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg.length<3) return value;
    const resultPost=[];
    for(const post of value)
    {
      if(post.nombre!=null && post.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1) 
          resultPost.push(post);  
          if(post.subPrograma.descripcion!=null && post.subPrograma.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1) 
          resultPost.push(post);  
          if(post.tipoCompeticion.descripcion!=null && post.tipoCompeticion.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1) 
          resultPost.push(post);  
          if(post.modalidad.descripcion!=null && post.modalidad.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1) 
          resultPost.push(post);  
          if(post.genero.descripcion!=null && post.genero.descripcion.toLowerCase().indexOf(arg.toLowerCase())>-1) 
          resultPost.push(post);     
    }
    return resultPost;
  }

}
