const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://devchauhan0212:HQlES1pAid4wvkYa@cluster0.x9hnu8a.mongodb.net/chat-app');

const User = mongoose.model('User',{
    name: {
        type: String
    },
    roomName:{
        type: String
    }
})

const Room = mongoose.model('Room',{
    roomName: {
        type: String
    },
    roomCode: {
        type: String
    },
    messages: [{
        username: {
            type: String
        },
        message: {
            type: String
        },
        createdAt: {
            type: Date
        }
    }]
})

async function createRoom(params) {
    //console.log(params);
//  If room exists go to room or else create one
try {
    const room = await Room.findOne({ roomName: params.roomName });
    if (room) {
        //console.log('Room already exists');
        // Assuming you want to return the room's message or some data
        // For demonstration, let's return the room object
        return room;
    } else {
        //console.log('Room does not exist');
        
    const room = new Room(params);
    room.save().then((response)=>{
        //console.log(response);
    }).catch((error)=>{
        //console.log(error);
    })
    return false
        return false;
    }
} catch (error) {
    console.error('Error checking room:', error);
    // Handle the error appropriately
    return false;
}
}

function sendMessage(params) {
    // Get message from params and store in Room
    Room.findOne({roomName: params.roomName}).then((room)=>{
        room.messages.push(params.message);
        room.save().then((response)=>{
            //console.log(response);
        }).catch((error)=>{
            //console.log(error);
        })
    }).catch((error)=>{
        //console.log(error);
    })
}

async function getMessages(roomName) {
    // Room.findOne({roomName}).then((room)=>{
    //     // //console.log("IN APIS :::",room);
    //     return room.messages;
    // }).catch((error)=>{
    //     //console.log(error);
    console.log("IN GETMSG");
    // }
    try {

            const room = await Room.findOne({roomName});
            console.log(room);
            return room ? room.messages : null;
        } catch (error) {
            console.log(error);
            return null; // or handle the error as needed
        }
    }
    

// createRoom({
//     roomName: 'Room1',
//     roomCode: '1234'
// })

// createRoom({
//     roomName: 'Room2',
//     roomCode: '5678'
// })

// sendMessage({
//     roomName: 'Room1',
//     message: {
//         username: 'Dev',
//         message: 'Hello',
//         createdAt: new Date()
//     }
// })
// sendMessage({
//     roomName: 'Room1',
//     message: {
//         username: 'Smit',
//         message: 'Hello Dev!',
//         createdAt: new Date()
//     }
// })

// sendMessage({
//     roomName: 'Room2',
//     message: {
//         username: 'DK',
//         message: 'Fine!',
//         createdAt: new Date()
//     }
// })
// const me = new User({
//     name: 'Dev',
//     roomName: 'Room3'
// })

// me.save().then((response)=>{
//     //console.log(response);
// }).catch((error)=>{
//     //console.log(error);
// })

module.exports = {
    createRoom,
    sendMessage,
    getMessages
}