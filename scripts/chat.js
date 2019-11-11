class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message){
        const now = new Date();
        //format a chat object
        const chat = {
            message,
            room : this.room,
            username : this.username,
            created_at : firebase.firestore.Timestamp.fromDate(now) 
        };
        const response = await this.chats.add(chat);
        return response;
    }
}

const chatroom = new Chatroom('gaming', 'peter');
chatroom.addChat('hello everyone')
.then(() => console.log('chat added'))
.catch(err => console.log(err));