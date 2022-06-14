const Mmu = require('./Mmu');

class Fifo extends Mmu{
  constructor(pm_size,vm_size){
    super(pm_size,vm_size);
    this.fifo_row=[];
    console.log('haz creado un mmu fifo');
  }

  PageRequired(pid,page){
    let index=-1;
    for(let i=0;i<this.table.length;i++)
      if(this.table[i].pid===pid && this.table[i].pid_page===page){
	index=i;
	break;
      }

    if(index===-1)
      return 0;

    if(this.table[index].here===1)
      return 1;
    else{
      console.log("******************** error de pagina");
      this.PageFault(index);
      console.log("******************** error de pagina");
      return 2;
    }
  }
  
  PageFault(index){
    if(this.fifo_row.length<this.pm_size){
      let i=this.frame_status.indexOf(true);
      this.table[index].physical_page=i;
      this.frame_status[i]=false;
      console.log("ASIGANDO MARCO DE PAGINA "+i);
    }else{
      console.log("SACANDO PAGINA "+this.fifo_row[0]);
      console.log("ASIGANDO MARCO DE PAGINA "+this.fifo_row[0].physical_page);
      this.fifo_row[0].here=0;
      this.table[index].physical_page=this.fifo_row[0].physical_page;
      this.fifo_row.shift();
    }
    this.table[index].here=1;
    this.fifo_row.push(this.table[index]);
  }

  DeleteProcess(pid){
    for(let i=0;i<this.table.length;i++){
      let elemento=this.table[i];
      if(elemento.pid===pid){
	elemento.pid="";
	if(this.fifo_row.length>0 && this.fifo_row.indexOf(elemento)!==-1){
	  this.frame_status[this.fifo_row[this.fifo_row.indexOf(elemento)].physical_page]=true;
	  this.fifo_row.splice(this.fifo_row.indexOf(elemento),1);
	}
      }
    }
  }

  FifoInfo(){
    let aux="";
    this.fifo_row.forEach((e)=>aux+="pid "+e.pid+" page "+e.pid_page+" frame "+e.physical_page+"\n");
    return aux;
  }
}

module.exports= Fifo;
