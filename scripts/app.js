//dom queries
const chatList = document.querySelector('.chat-list');
const newChatform = document.querySelector('.new-chat'); 
const newNameform = document.querySelector('.new-name');
const msg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatform.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatform.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatform.reset())
    .catch(err => console.log(err));
});
//update the username
newNameform.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameform.name.value.trim();
    chatroom.updateUsername(newName);
    newNameform.reset();
    msg.textContent = `User changed name to ${newName}`;
    setTimeout(() => msg.textContent = ' ', 3000);
});
//switch the chatrooms
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

const username = localStorage.username ? localStorage.username : 'anonymous';

//create chat instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);
//get chats and render them to the DOM
chatroom.getChats(data => {
    chatUI.render(data);
});