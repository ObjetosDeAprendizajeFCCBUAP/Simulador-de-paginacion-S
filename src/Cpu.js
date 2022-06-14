const Loader=require('./Loader');
const Scheduler=require('./Scheduler');
const Fifo=require('./Fifo');

class Cpu{

  constructor(loader,pm,vm,quantum=1){
    this.loader=(loader===null)?(new loader()):(loader);
    this.scheduler=new Scheduler(loader,quantum);
    this.mmu=new Fifo(pm,vm);
    this.clock_cpu=0;
    this.quantum=quantum;
  }

  ResetClock(){
    this.clock_cpu=0;
  }

  RunSim(){
    for(;this.scheduler.MoreProcessToExecute(this.clock_cpu);this.clock_cpu++){
      let aux=this.scheduler.LoadProcess(this.clock_cpu);
      if(aux!==null && !(this.mmu.AddingProcess(aux))){
	let auxp=this.scheduler.KillLastProcess();
      }
      aux=this.scheduler.ExecuteProcess();
      if(aux!==null){
	let pr=this.mmu.PageRequired(aux.pid,aux.references[aux.actual_reference]);
      }
      aux=this.scheduler.WaitProcess();
      if(aux!==null)
	this.mmu.DeleteProcess(aux.pid);
    }
  }

  RunSimOne(){
    if(this.scheduler.MoreProcessToExecute(this.clock_cpu)){
      let aux=this.scheduler.LoadProcess(this.clock_cpu);
      if(aux!==null && !(this.mmu.AddingProcess(aux))){
	let auxp=this.scheduler.KillLastProcess();
      }
      aux=this.scheduler.ExecuteProcess();
      if(aux!==null){
	let pr=this.mmu.PageRequired(aux.pid,aux.references[aux.actual_reference]);
      }
      aux=this.scheduler.WaitProcess();
      if(aux!==null)
	this.mmu.DeleteProcess(aux.pid);
      this.clock_cpu++;
      return true;
    }else
      return false;
  }

  RunSimV(){
    for(;this.scheduler.MoreProcessToExecute(this.clock_cpu);this.clock_cpu++){
      let aux=this.scheduler.LoadProcess(this.clock_cpu);
      console.log("#################################\n\n");
      console.log("hora "+this.clock_cpu+" : "+((aux===null)?("null"):(aux.InfoProcess())));
      console.log("---Status Scheduler ("+this.clock_cpu+")---");
      console.log(this.scheduler.SchedulerInfo());
      if(aux!==null && !(this.mmu.AddingProcess(aux))){
	let auxp=this.scheduler.KillLastProcess();
	console.log("!!!!!!!!!!! Proceso no cargado por falta de espacio:"+auxp.InfoProcess());
      }
      console.log("---ejecutando----");
      console.log(this.scheduler.ExecuteInfo());
      aux=this.scheduler.ExecuteProcess();
      if(aux!==null){
	console.log("------------administracions de paginas------------");
	let pr=this.mmu.PageRequired(aux.pid,aux.references[aux.actual_reference]);
	console.log("la pagina "+aux.references[aux.actual_reference]+" del proceso  "+aux.pid+((pr===1)?(" ya esta en memoria fisica"):(" fue llevada a memoria fisica")));
      }
      aux=this.scheduler.WaitProcess();
      if(aux!==null)
	this.mmu.DeleteProcess(aux.pid);
      console.log("--------tabla de procesos-------");
      console.log(this.mmu.TableInfo());
      console.log("--------Marcos de pagina-------");
      console.log(this.mmu.FramesInfo());
      console.log("--------fifo fila-------");
      console.log(this.mmu.FifoInfo());
    }
  }

  RunSimOneV(){
    if(this.scheduler.MoreProcessToExecute(this.clock_cpu)){
      let aux=this.scheduler.LoadProcess(this.clock_cpu);
      console.log("#################################\n\n");
      console.log("hora "+this.clock_cpu+" : "+((aux===null)?("null"):(aux.InfoProcess())));
      console.log("---Status Scheduler ("+this.clock_cpu+")---");
      console.log(this.scheduler.SchedulerInfo());
      if(aux!==null && !(this.mmu.AddingProcess(aux))){
	let auxp=this.scheduler.KillLastProcess();
	console.log("!!!!!!!!!!! Proceso no cargado por falta de espacio:"+auxp.InfoProcess());
      }
      console.log("---ejecutando----");
      console.log(this.scheduler.ExecuteInfo());
      aux=this.scheduler.ExecuteProcess();
      if(aux!==null){
	console.log("------------administracions de paginas------------");
	let pr=this.mmu.PageRequired(aux.pid,aux.references[aux.actual_reference]);
	console.log("la pagina "+aux.references[aux.actual_reference]+" del proceso  "+aux.pid+((pr===1)?(" ya esta en memoria fisica"):(" fue llevada a memoria fisica")));
      }
      aux=this.scheduler.WaitProcess();
      if(aux!==null)
	this.mmu.DeleteProcess(aux.pid);
      console.log("--------tabla de procesos-------");
      console.log(this.mmu.TableInfo());
      console.log("--------Marcos de pagina-------");
      console.log(this.mmu.FramesInfo());
      console.log("--------fifo fila-------");
      console.log(this.mmu.FifoInfo());
      this.clock_cpu++;
      return true;
    }else
      return false;
  }

}

module.exports=Cpu;
