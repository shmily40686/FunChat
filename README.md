# Fun Chat
<a href="http://fun-chats.herokuapp.com/">Live link</a>

## What is Fun Chat?

Fun Chat is an international chat application with built in translation services. This allows users to write in a preferred language and translate to a foreign language. This makes it easier than ever to communicate with people from different backgrounds and different nationalities.

## Fun Chat Features

 * Sending and receiving messages instantly
   * Fun Chat utilizes the immediate speed of web sockets.
   * Messages are instantly translated from an "origin" language to a "destination" language.
   * Fun Chat offers support for Emojis.
   
![Translated messaging](images/fun-chat.gif)
  
 * Unique categorization of contacts
   * Contacts are categorized by their spoken languages.
   * Additional spoken languages are displayed for each user.
 
 ![Selecting language](images/language_select.gif)
 
 * Group chat
   * Offers a single group chat with many users translating to a single language.
   
 ![Group chat](images/group_chat.gif)
 

## Technologies Used

 * Backend
   * Database: MongoDB
   * Server: Express.js
   * WebSocket framework: Socket.io
   * Authentication: BCrypt
  
 * Frontend
   * Framework: React
   * State Management: Redux
   * CSS3

## Upcoming Features

 * Notifications of new messages.
 * Add contacts by email search.
 * Support for additional languages.
