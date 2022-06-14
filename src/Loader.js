
class Loader{
  constructor(process_list=[]){
    this.process_list=process_list;
  }
  
  AddProcess(process){
    this.process_list.push(process);
  }

  AddProcessArray(){
    this.process_list+=pl;
  }

  ChangeProcessArray(pl){
    this.process_list=pl;
  }


  CheckProcessArriving(actual_time){
    let process = null;
    this.process_list.forEach(function(elemento,indice,array){
      if(elemento.time_arriving===actual_time)
	process=elemento;
    });
    return process;
  }

  MoreToCome(actual_time){
    let process = null;
    this.process_list.forEach(function(elemento,indice,array){
      if(elemento.time_arriving>=actual_time)
	process=elemento;
    });
    return (process===null)?(false):(true);
  }

  InfoProcessList(){
    let aux="";
    this.process_list.forEach((e)=>aux+=e.InfoProcess());
    return aux;
  }
}

module.exports = Loader;
