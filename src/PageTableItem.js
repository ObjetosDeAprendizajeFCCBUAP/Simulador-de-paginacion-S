
class PageTableItem{
  constructor(){
    this.pid="";
    this.referenced=0;
    this.modified=0;
    this.here=0;
    this.pid_page=0;
    this.physical_page=0;
  }

  ItemInfo(){
    return "pid:"+this.pid+", referenced:"+this.referenced+",  modified:"+this.modified+", here:"+this.here+", page-process:"+this.pid_page+", physical_page:"+this.physical_page+"\n";
  }
}

module.exports = PageTableItem;
