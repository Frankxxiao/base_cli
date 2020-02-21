import css from "./index.less";
import pic from "./icon.png";
import jsFile from "./test.js";
import jsonFile from "./test.json";
import axios from "axios";
// import "@babel/polyfill";

// test the loader source
var img = new Image();
img.src = pic;
img.classList.add("logo");


var root = document.getElementById("root");
root.append(img);

// test the babel 
// let data = new Promise(function(resolve, reject){ console.log("the data ")});
// console.log("the data is : ", data);

// console.log("---------------");
// console.log(Object.defineProperty,Object.getOwnPropertyDescriptor(Object,"key"));


// Object.freeze();

// test the dev-server and the proxy 
// get the info from the Express Application : ./serverDemo.js
// axios.get("/api/info").then((res)=>{
//     console.log("the res is : ", res);
// })

//test vue
// import Vue from 'vue';
// let newNode = new Vue();

//test generator

function *main(){
    try {
        var text = yield myPromise();
        console.log("generator result :", text);
    }catch(err){
        console.error("generator err :",err);
    }
}
//创建出迭代器
let mainIterator = main();

function myPromise(){
    axios.get("/api/info").then(
        function(text){
            console.log(" resolved : ", text);
            mainIterator.next(text);
        },
        function(error){
            console.log(" rejected : ", error);
            mainIterator.throw(error);
        }
    )
}
//启动迭代器
mainIterator.next();
