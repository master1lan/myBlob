function fn(){
    return new Promise((resolve,reject)=>{
        resolve([1,2,3]);
    }).then((data)=>{
        return new Promise((resolve)=>{
            resolve(data)
        })
    })
}
console.log(fn());