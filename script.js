// console.log(process.argv);
// // const [,,a,b]=process.argv;
// // function sum(a, b) {
// //     return a+b;
// // }
// // const [,,num]=process.argv;
// // function dupl(num){
// // return num*num
// // }
// // console.log(dupl(num));
// // console.log(process.argv[2]);
// // console.log(global);
// // const os=require('os');
// // console.log("free storage ",os.freemem());
// // console.log("free storage ",os.version());
// // console.log("free storage ",os.cpus());

// const fs=require('fs');
// // const data='hello all';
// // fs.writeFile('./new.txt',data,function(err){
  
// //     console.log("completed writing");

// // })

// fs.readFile('text.txt','utf-8',function(err,data){
//     if(err)
//     {
//         throw err;
//     }
//     else{
//         console.log(data);
//     }

// })


var fs= require('fs');
var newdate=new Date()
var date=`Today date is ${newdate} `;
fs.writeFile(`./writefile.txt`,date,function(err,data)
{
    if(err)
    throw err;
    else
    console.log("writing completed ");
})