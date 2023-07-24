"use strict";

// JSON -> JavaScript Object Notation
// XML -> JSON-ի նման նախատեսված է data-ներ փոխանցելու համար // web-ի համար ինքը ծանր է
// JSON-ով հնարավոր է անել DEEP CLONING
// JSON-ի մեջ իրավունք չունենք METHOD փոխանցելու
// JSON.stringify() - մեէոդ է, որը Object-ը կամ Array-ը դարձնում է JSON
// JSON.parse() - մոթոդ է, JSON-ը է JavaScript


/* JSON-ը դոկումենտի ֆորմատ է, html, css, java և այլ-ի նման, ինքը նախատեսված է Front-ից data-ներ
ուղարկելու, և Backend-ից data-Ներ ստանալու համար */

// const person = {
//     name: "John",
//     surname: "Smith",
//     age: 22
// }

/////
// const data = JSON.stringify(person);

// console.log(person, "PERSON OBJECT"); // { name: 'John', surname: 'Smith', age: 22 } PERSON OBJECT
// console.log(data, "JSON"); // {"name":"John","surname":"Smith","age":22} JSON
// /* JSON-ում բոլոր key-երը գտվում են double ստրինգների՝ "" մեջ */

/////
// const data = JSON.stringify(person, null, 2); // ունի 3 պարամերտ, 1)object, 2) null,/ֆունկցիա, 3)Պրաբելների քանակ
// /*  JSON-ում ամեն ինչ վերցվում է սրինգների մեջ՝ "", բացառությամբ numers-ի և boolean-ի*/
// console.log(person); 
// console.log(data);

//———————————————————————————————————————————————————————————————————————————————————————————————
// const person = {
//     name: "John",
//     surname: "Smith",
//     age: 22,
//     parents:{
//     mom: "Jessica",
//     dad: "Adam"
//     }
// }

// const data = JSON.stringify(person, null, 2); // դարձնում ենք JSON
// const cloneData = { ...person }; //մակերեսային կլոնավորում, 2-ում և 1-ում բան փոխելուց 2 էլ կփոխվի

// cloneData.parents.mom = "Dina";
// cloneData.parents.dad = "Lucas";
 
// console.log(person);
// console.log(cloneData);

/////

// const person = {
//     name: "John",
//     surname: "Smith",
//     age: 22,
//     parents:{
//     mom: "Jessica",
//     dad: "Adam"
//     }
// }

// const data = JSON.stringify(person, null, 2); // դարձնում ենք JSON

// const test = JSON.parse(data);
 
// console.log(person);
// console.log(data);
// console.log(test);

/////

// const person = {
//     name: "John",
//     surname: "Smith",
//     age: 22,
//     parents:{
//     mom: "Jessica",
//     dad: "Adam"
//     },
//     //JSON չի կարողանում աշխատել մեթոդների հետ
//     myNotes () {
//         console.log(`Hello, my name is ${this.name}, and i have notes about my life`);
//     }
// }

// const data = JSON.stringify(person, null, 2); // դարձնում ենք JSON
// console.log(data); // Object առանց մեթոդ, JSON չի կարողանում աշխատել մեթոդների հետ

// const clonePerson = JSON.parse(JSON.stringify(person)); // deep cloning 
// /* deep cloning-ի ժմկ․, 2-ի մեջ բան փոխենք, առաջինը չի փոխվի, 1-ի մեջ բան փոխենք երկրորդը կփոխվի, քանի որ 1-ինը բնօրինակն է */

// clonePerson.parents.mom = "Dina";
// clonePerson.parents.dad = "Max";
 
// console.log(person);
// console.log(clonePerson);


/* JSON
{
  "name": "John",
  "surname": "Smith",
  "age": 22,
  "parents": {
    "mom": "Jessica",
    "dad": "Adam"
  }
}
XML
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <age>22</age>
  <name>John</name>
  <parents>
    <dad>Adam</dad>
    <mom>Jessica</mom>
  </parents>
  <surname>Smith</surname>
</root>
*/

//—————————————————————————————————————————————————————————————————————————————————————————————

// AJAX -> Asynchronous JavaScript and XML
// new XMLHttpRequest();

/* ասինխրոն նշ․ է, որ երբ որ դուք կայքում գործողություն եք անում, ինքը էջը refresh չի անում */

// status codes
// 100 === info
// 200 === ok
// 300 === redirect
// 400 === user error
// 500 === server error

const amd = document.querySelector("#amd");
const usd = document.querySelector("#usd");

// amd.addEventListener("input", (e) => {
//   console.log(e.target.value);
// })

amd.addEventListener("input", () => {
  // ստեղծեցինք հարցում
  const request = new XMLHttpRequest();
  
  setTimeout(() => {
    if (typeof (amd.value) !== "number" && isNaN(amd.value)) {
    amd.value = "";
    usd.value = "";
    }
  }, 10);
  
    // 1.նշեցինք հարցման մեթոդն ու ճանապարհը
    request.open("GET", "js/exchange.json"); // open ունի՝ method(GET, PUSH, POST, DELETE), url, sync, login, password

    // 2.նշեցինք հարցման վերնագրերը
    request.setRequestHeader("Content-type", "applicatin/json; charset=utf-8");
    
    // 3.ուղարկեցինք հարցումը
    request.send(); // GET-ի դեպքում ոչ մի պարամետր չի ընդունում
    
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        // console.log(request.response);
        const data = JSON.parse(request.response);
        usd.value = (parseFloat(amd.value) / parseFloat(data.current.usd)).toFixed(2);
      } else {
        usd.value = "Something went wrong!";
        }
    });

});

usd.addEventListener("input", () => {
  const request = new XMLHttpRequest();

  setTimeout(() => {
      if (typeof (usd.value) !== "number" && isNaN(usd.value)) {
          usd.value = "";
          amd.value = "";
      }
  }, 10);

  request.open("GET", "js/exchange.json");

  request.setRequestHeader("Content-type", "application/json; charset=utf-8");

  request.send();

  request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
          const data = JSON.parse(request.response);
          amd.value = (parseFloat(usd.value) * parseFloat(data.current.usd)).toFixed(2);
      } else {
        amd.value = "Something went wrong!";
      }
    });
  
});

// request.status //ստանում ենք թվով՝ 200, 201, 208, 404 և այլն
// request.statusText // error, ok
// request.response // request-ի պատասխանն է
// request.readyState // պատրաստ լինելու աստիճանը՝ 5 տեսակի են

// ready state
/*
0: unset // 3 փուլերիչ ոչ մեկը չկա
1: opened // 1 փուլը կա
2: headers_recived // 2 փուլը կա
3: loading
4: done
*/





