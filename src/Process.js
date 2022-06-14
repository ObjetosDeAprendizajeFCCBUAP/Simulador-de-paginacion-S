class Process{
  constructor(pid,number_pages,references,time_arriving,actual_reference=0){
    this.pid=pid;
    this.number_pages=number_pages;
    this.references=references
    this.time_arriving=time_arriving;
    this.actual_reference=actual_reference;
  }

  InfoProcess(){
    return "Id:"+this.pid+", numero de paginas:"+this.number_pages+", references:["+this.references+"], tiempo de llegada:"+this.time_arriving+"\n";
  }
}


module.exports = Process;
