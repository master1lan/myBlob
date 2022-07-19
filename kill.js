const exec=require('child_process').exec;
const checkPort=[3000,7001];

function check(port){
    exec(`lsof -i:${port}`,(error,stdout,stderr)=>{
        //说明没有被占用
        if(error!==null){
            return;
        }
        //arr的第一个是pid
        const arr=stdout.split(' ').filter(item=>Number(item));
        if(arr.length){
            exec(`kill ${arr[0]}`);
        }
    });
}

checkPort.forEach(check);