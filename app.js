const Process=require('./src/Process');
const Loader=require('./src/Loader');
const Cpu=require('./src/Cpu');

let a = new Process("a",10,[1,2,3,1,2,4],3);
let b = new Process("b",9,[2,3,1,2,4],4);
let c = new Process("c",8,[3,1,2,4],5);
let d = new Process("d",7,[1,2,4],8);
let lista=[a,b,c];

let loader = new Loader(lista);
console.log(loader.InfoProcessList());

loader.AddProcess(d);
console.log(loader.InfoProcessList());

let cpu=new Cpu(loader,20,30)

cpu.RunSimV();
