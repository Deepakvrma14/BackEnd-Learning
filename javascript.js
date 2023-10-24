// const username = (email) => {
//     return email.slice(0, email.indexOf("@"));

// }
// console.log(username("abc@ge.com"));

// const obj = {name: "deepak"};
// console.log(obj);
// console.log(obj.name);

// const vehicle = { 
//     name: "car",
//     start: function(){
//         console.log("starting", this.name);
//     }
// }
// const truck  = Object.create(vehicle);
// truck.door = 4; 
// console.log(truck.name);
// console.log(truck.start());
// console.log(truck.door);

const band = {
    name: "metallica",
    albums: [
        {name: "master of puppets", year: 1990},
        {name: "ride the lightning", year: 1991}
    ],
    bandMembers: [
        {name: "deepak", age: 30},
        {name: "sachin", age: 31}
    ]
}
console.log(Object.keys(band));
console.log(Object.values(band));

console.log("------------------");
for (let i in band) {
    // console.log( band[i]);
    console.log('playing ${i} ');
    // console.log(`playing ${i} && `);
}

console.log("------------------");

// destructring the object 


const {name: myvar} =  band;
console.log(myvar);