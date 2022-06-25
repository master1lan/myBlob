
const path = require('path');

const res=path.normalize('app/public');
console.log(res);
console.log(res.replace(/app/g,''));