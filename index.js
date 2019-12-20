const fs = require('fs')
const PDFDocument = require('pdfkit')
const moment = require('moment')

let messages = JSON.parse(fs.readFileSync('./messages.json'))
let rooms = JSON.parse(fs.readFileSync('./rooms.json'))

let roomMap = new Map()
for(let room of rooms){
    if(roomMap.has(room._id)) throw "duplicate room id?"
    roomMap.set(room._id, room)
}

for(let message of messages){
    room = roomMap.get(message.rid)
    if(!room){
        room = {
            _id: message._id,
            name:'MESSAGE NOT IN A ROOM',
            messageList:[message]
        }
        roomMap.set(message.id, room)
    }else{
        if(room.t == 'd') room.name = 'DM_' + room.usernames
        if(room.messageList){
            room.messageList.push(message)
        }
        else{
            room.messageList = []
            room.messageList.push(message)
        }
        roomMap.set(message.rid, room)
    }
}

roomMap.forEach(room => {
    if(room.messageList){
        if(!room.name) room.name = room.usernames
        let doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('./pdfs/'+ room.name +'.pdf'))
    
        doc
        .fontSize(25)
        .text(room.name, {width:400,align: 'center'})
        
        for(let message of room.messageList){
            let dateTime = moment(parseInt(message.ts.$date.$numberLong)).format("dddd, MMMM Do YYYY, h:mm:ss a")
            doc.moveDown()
            doc.fontSize(12)
            .text(dateTime+ ':' + message.u.username + ': ' + message.msg, {width:400,align: 'left'})
        }
        doc.end()
    }
});
