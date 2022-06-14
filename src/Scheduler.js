class Scheduler{
    
  constructor(loader,quantum=1){
    this.loader=loader;
    this.waiting_list=[];
    this.done_list=[];
    this.quantum=quantum;
    this.qn=1;
  }

  LoadProcess(actual_time){
    let process = this.loader.CheckProcessArriving(actual_time);
    if(!(process===null)){
      this.waiting_list.push(process);
      return process;
    }
    return null;
  }

  KillLastProcess(p){
    if(this.waiting_list.length>0)
      return this.waiting_list.pop();
    return null;
  }

  ExecuteProcess(){
    if(this.waiting_list.length>0)
      return this.waiting_list[0];
    return null;
  }

  WaitProcess(){
    if(this.waiting_list.length>0){
      this.waiting_list[0].actual_reference++;
      if(this.waiting_list[0].actual_reference>=this.waiting_list[0].references.length){
	this.done_list.push(this.waiting_list.shift());
	return this.done_list[this.done_list.length-1];
      }
      else{
	if(this.qn===this.quantum){
	  this.waiting_list.push(this.waiting_list.shift());
	  this.qn=1;
	}else{
	  this.qn++;
	}
      }
    }
    return null;
  }

  MoreProcessToExecute(actual_time){
    /*if(this.waiting_list.length>0)
      return true;
    else
      return this.loader.MoreToCome(actual_time);*/
    return (this.waiting_list.length>0)?(true):(this.loader.MoreToCome(actual_time));
  }

  ExecuteInfo(){
    let aux=(this.waiting_list.length===0)?("null\n"):("pid: "+this.waiting_list[0].pid+" ["+this.waiting_list[0].actual_reference+"]="+this.waiting_list[0].references[this.waiting_list[0].actual_reference]);
    return aux;
  }

  SchedulerInfo(){
    let aux="";
    let p=this.ExecuteProcess();
    aux+="----execute process----\n";
    aux+=((p===null)?("null"):(p.pid+"["+p.actual_reference+"]"))+"\n";
    aux+="----waiting list----\n";
    if(this.waiting_list.length>1)
      this.waiting_list.slice(1).forEach((e)=>aux+="pid: "+e.pid+"["+e.actual_reference+"]"+"\n");
    else
      aux+="null\n";
    aux+="----done list----\n";
    if(this.done_list.length>1)
      this.done_list.forEach((e)=>aux+="pid: "+e.pid+"\n");
    else
      aux+="null\n";
    return aux;
  }
}

module.exports = Scheduler;
