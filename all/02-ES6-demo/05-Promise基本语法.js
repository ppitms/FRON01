let fs = require("fs");
let p=new Promise((resolve,reject)=>{
    fs.readFile('d:/Java/Microsoft VS Code/WorkSpace/FRON01/01-Node_demo/a.txt',(err,data)=>{
        console.log("执行异步任务");
        if(err)reject(err);
        if(data)resolve(data);
    })
})
p.then(response=>{
    console.log("获取异步执行结果：",response.toString());
}).catch(err=>{
    console.log("获取异步执行错误：",err.toString())
})

console.log("主线程执行任务");