import css from "./index.less";
import pic from "./icon.png";
import jsFile from "./test.js";
import jsonFile from "./test.json";
import axios from "axios";

// test the loader source
var img = new Image();
img.src = pic;
img.classList.add("logo");


var root = document.getElementById("root");
root.append(img);

// test the babel 
let data = new Promise(function(resolve, reject){ console.log("the data ")});
console.log("the data is : ", data);


// test the dev-server and the proxy 
// get the info from the Express Application : ./serverDemo.js
axios.get("/api/info").then((res)=>{
    console.log("the res is : ", res);
})

//test vue
import Vue from 'vue';
let newNode = new Vue();