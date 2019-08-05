const five = require("johnny-five");
const board = new five.Board({ repl: false });
const app = require('express')()
const http = require('http').Server(app);
var moment = require('moment')
const io = require('socket.io')(http);
// var PubNub = require('pubnub');
var lights =
    [{
        name: "lights1",
        id: "l01",
        grade: 12,
        data: [
            [
                { hour: "00.00", on: true, oc: true },
                { hour: "09.00", on: false, oc: true },
                { hour: "11.00", on: true, oc: false },
                { hour: "11.00", on: false, oc: true }
                // { hour: "13.00", on: true, oc: false },
                // { hour: "16.00", on: false, oc: true },
                // { hour: "18.00 PM", on: false, oc: false },
                // { hour: "21.00 PM", on: false, oc: false }
            ]
        ]
    },
    {
        name: "lights2",
        id: "l02",
        grade: 70,
        data: [
            [
                { hour: "00.00", on: false, oc: true },
                { hour: "02.00", on: true, oc: false },
                { hour: "05.00", on: false, oc: true },
                { hour: "11.00", on: true, oc: false }
                // { hour: "13.00", on: true, oc: false },
                // { hour: "14.00", on: false, oc: true },
                // { hour: "15.00", on: false, oc: false },
                // { hour: "16.00", on: false, oc: false }
            ]
        ]
    },
    {
        name: "lights3",
        id: "l03",
        grade: 10,
        data: [
            [
                { hour: "00.00 AM", on: false, oc: true },
                { hour: "11.00 AM", on: true, oc: false }
                // { hour: "13.00 PM", on: true, oc: false },
                // { hour: "15.06 PM", on: false, oc: true },
                // { hour: "17.22 PM", on: false, oc: false },
                // { hour: "20.56 PM", on: false, oc: false }
            ]
        ]
    },
    {
        name: "lights4",
        id: "l04",
        grade: 60,
        data: [[
            { hour: "00.00", on: false, oc: true },
            { hour: "11.00", on: true, oc: true }
            // { hour: "12.00 PM", on: true, oc: true },
            // { hour: "12.20 PM", on: true, oc: false },
            // { hour: "13.10 PM", on: false, oc: true },
            // { hour: "15.00 PM", on: false, oc: false },
            // { hour: "19.20 PM", on: false, oc: false }
        ]]
    }]
    ;

init();



// var pubnub = new PubNub({
//     subscribeKey: "sub-c-07d1db04-b6b9-11e9-86ba-226fbed9e4f2",
//     publishKey: "pub-c-9181a815-80c6-440e-a81f-a8fecb16e3b2",
//     ssl: true
// })
// pubnub.subscribe({
//     channels: ['leds'],
// });


board.on("ready", function () {

    io.on('connection', (socket) => {
        io.emit('leds', lights)

        const greenLed = new five.Led(3)
        const redLed = new five.Led(6)
        const yellowLed = new five.Led(5)

        socket.on("l01", (data) => {
            data ? greenLed.on() : greenLed.off();
            io.emit('leds', lights);
        })


        socket.on("l02", (data) => {
            data ? yellowLed.on() : yellowLed.off()
            io.emit('leds', lights);
        })

        socket.on("l03", (data) => {
            data ? redLed.on() : redLed.off()
            io.emit('leds', lights);

        })
    })



});
// lights.data[0][light.data[0].length - 1]

function init() {
    setTimeout(
        atMidnight, moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds')
    );
    // setTimeout(
    //     atMidnight, moment("12:00:00", "hh:mm:ss").diff(moment(), 'seconds')
    // );

}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function atMidnight() {
    // lights.forEach(light => {
    //     var newObject = clone(light.data[0][light.data[0].length - 1]);
    //     var endOf = clone(light.data[0][light.data[0].length - 1]);
    //     endOf.hour = "24:00";
    //     light.data[0].push(endOf);

    //     newObject.hour = "00.00"

    //     newArray = [newObject];

    //     var addArray = [newArray].concat(light.data);
    //     light.data = addArray;

    // })


}

// let newDay = [3, 2, 1]
// const newFirstElement = 4




// io.on('connection', function (socket) {
// 	var strData;
//Instantiate a new Pubnub instance along with the subscribeKey 

//adding listener to pubnub
//     pubnub.addListener({
//         message: function(message) {
// /*checking whether the message contains data for the ‘Apple’ category or not.*/
//         	if(message.message.symbol=='Apple'){
//                         /*Creates a new date object from the specified message.timestamp.*/ 
//         		var x = new Date(message.message.timestamp);
// //Converting the timestamp into a desired format. HH:MM:SS:MS
// 		var formatted =  (x.getHours()) + ':' + (x.getMinutes()) + ':' + (x.getSeconds()) + ':' + (x.getMilliseconds());
//                        /*Here we are creating an object which will contain a timestamp as label and the ‘order_quantity’ as value.*/
//         		strData = {"label": formatted,
// 						   "value":message.message.order_quantity
// 						}
//                                                //sending data to the client
// 				socket.emit('news', strData);
//         	};  
//         }
//     })      
//     console.log("Subscribing..");
// //Subscribe the PubNub channel
//     pubnub.subscribe({
//         channels: ['pubnub-market-orders'] 
//     });
// });



http.listen(3001, function () {
    console.log('listening on *:3001');
});