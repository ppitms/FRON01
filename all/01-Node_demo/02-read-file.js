let fs=require("fs");
fs.readFile('d:/Java/Microsoft VS Code/WorkSpace/FRON01/01-Node_demo/a.txt',(err,data)=>{
    if(err){
        console.log("读取错误：",err);
    }
    if(data){
        console.log("读取结果：",data.toString())
    }
});