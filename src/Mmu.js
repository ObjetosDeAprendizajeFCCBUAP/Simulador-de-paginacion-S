const PageTableItem = require('./PageTableItem');


class Mmu{
  constructor(pm_size,vm_size){
    this.pm_size=pm_size;
    this.vm_size=vm_size;
    this.table=[];
    this.frames_used=0;
    this.frame_status=[];
    for(let i=0;i<vm_size;i++)
      this.table.push(new PageTableItem());
    for(let i=0;i<pm_size;i++)
      this.frame_status.push(true);
  }

  AddingProcess(process){
    if(process.number_pages<=(this.vm_size - this.frames_used)){
      this.frames_used+=process.number_pages;
      let i=0;
      let j=0;
      for(;i<this.vm_size && j<process.number_pages;i++){
	if(this.table[i].pid===""){
	  this.table[i].pid=process.pid;
	  this.table[i].referenced=0;
	  this.table[i].modified=0;
	  this.table[i].here=0;
	  this.table[i].pid_page=j;
	  this.table[i].physical_page=0;
	  j++;
	}
      }
      return true;
    }else
      return false;
  }

  DeleteProcess(pid){
    this.table.forEach(function(elemento,indice,array){
      if(elemento.pid===pid)
	elemento.pid="";
    });
  }

  CheckPidPage(pid,page){
    for(let i=0;i<this.vm_size;i++)
      if(this.table[i].pid===pid && this.table[i].pid_page===page)
	return this.table[i];
    return null;
  }

  TableInfo(){
    let aux="";
    this.table.forEach((e,i)=>aux+=i+"--"+e.ItemInfo());
    return aux;
  }

  FramesInfo(){
    let aux="";
    aux+=this.frame_status;
    return aux;
  }

}

module.exports= Mmu;
