🚀 Real-Time Chat Application (Next.js + Socket.IO)

This is a real-time chat application inspired by Slack / WhatsApp Web, built to demonstrate real-time system design, optimistic UI, and state consistency using Socket.IO.

The project focuses on handling real-world challenges like reconnections, duplicate messages, multi-tab usage, and background message updates.

🧑‍💻 Author

Waseem Ahmad
Full-Stack Developer

🛠 Tech Stack

Frontend: Next.js (React), TypeScript

Backend: Node.js, Express

Realtime: Socket.IO

State Management: React Hooks

Persistence: In-memory (mocked)

⚙️ Getting Started
Install dependencies
npm install

Run the development server
npm run dev


The application will be available at http://localhost:3000.

🎯 Objective

Build a fully functional real-time chat system supporting:

1-to-1 chats

Group chats

Unread message notifications

Optimistic UI updates

Reliable real-time communication

🔐 Authentication

Mock JWT-based authentication

User identity persisted using localStorage

Automatic user re-registration on socket reconnect

💬 Chat Features
1️⃣ One-to-One Chat

Create direct conversations between two users

Real-time message delivery

👥 Group Chat

Create group conversations

Multiple participants supported

Messages broadcast to all group members

✉️ Message Handling

Optimistic UI: Messages appear instantly while sending

Message States:

sending

sent

failed

Auto-scroll to the latest message

Proper message ordering using timestamps

🔔 Notifications

Unread message count per chat

Unread count increases for background chats

Unread count resets automatically when the chat is opened

Notification logic handled entirely on the client side

⚡ Real-Time Communication

Implemented using Socket.IO

Automatic room joining per chat (chatId)

Handles:

User connection

Disconnection

Reconnection

Supports multiple browser tabs safely

⚠️ Edge Cases Handled

Socket disconnect & auto-reconnect

Duplicate message prevention

Message ordering consistency

Multiple active browser tabs

Background message updates

⭐ Extra Credit Implemented
✍️ Typing Indicator

Real-time typing indicator per chat

Emits typing and stopTyping events

Automatically stops on inactivity or message send

Live feedback to other participants

📦 Project Highlights

Clean, component-based architecture

Strong separation of chat state and message state

Production-like real-time behavior

Scalable socket room strategy

Easy to extend for:

Read receipts

Message reactions

🔄 Application Flow Overview

This application follows an event-driven, socket-based architecture designed to ensure low latency, state consistency, and a smooth user experience similar to Slack or WhatsApp Web.

1️⃣ User Authentication & Initialization

On first visit, the user enters a name

A mock JWT token is generated and stored in localStorage

On reload, user identity is restored automatically

On socket connection, the user is re-registered on the server

2️⃣ Socket Connection Lifecycle

Each browser tab creates its own Socket.IO connection

Socket.IO handles automatic reconnection on network failures

On reconnect:

User is re-registered

Existing chats are reloaded

User is re-joined to all chat rooms

Connection state (connected, reconnecting, disconnected) is tracked on the client

3️⃣ Online Users Management

Server maintains an in-memory map of online users

Online users list is broadcast on connect/disconnect

Current user is filtered out client-side

4️⃣ Chat Creation Flow

Users can create:

1-to-1 chats

Group chats

On chat creation:

Chat is stored in server memory

Participants are associated via userChats

Online participants receive real-time chat invites

Offline users receive the chat on reconnect

5️⃣ Chat Room Strategy

Each chat maps to a Socket.IO room using chatId

When a chat is opened:

User joins the room

Chat history is sent

Messages are broadcast only to relevant participants

6️⃣ Message Sending & Optimistic UI

Message appears instantly with status sending

Message is emitted to the server

On server acknowledgment:

Status → sent

On failure:

Status → failed

This ensures a fast and responsive UX.

7️⃣ Duplicate Message Prevention

Every message has a unique messageId

Server uses a temporary cache to reject duplicates

Client checks for duplicate IDs before rendering

Prevents duplicates during retries, reconnects, and multi-tab usage

8️⃣ Message Ordering & State Consistency

Messages sorted using timestamps

Messages stored per chatId

Background chats receive messages without interrupting the active chat

9️⃣ Unread Message Notifications

Each chat maintains its own unreadCount

Background messages increment unread count

Opening a chat resets unread count

All logic handled client-side

🔟 Typing Indicators

Implemented as transient real-time events

typing event emitted while user types

stopTyping emitted on inactivity

Typing state tracked per chat and not persisted

1️⃣1️⃣ Multi-Tab Safety

Each tab maintains its own socket connection

Chat rooms ensure scoped message delivery

Duplicate rendering prevented via message ID checks

Unread state handled independently per tab

1️⃣2️⃣ Error Handling & Stability

Automatic socket reconnection

Graceful network failure handling

Message retry support for failed messages

Safe cleanup of stale socket references

Memory protection via message cache cleanup

🧠 Key Architectural Decisions

Socket rooms (chatId) for scalable message delivery

Optimistic UI for instant user feedback

Client-side unread state for performance

In-memory persistence for simplicity

Event-driven design for real-time systems

🧪 Future Improvements

Read receipts

Message reactions

Role-based permissions in group chats

Database persistence

File & media sharing

✅ Summary

This project demonstrates a production-like real-time chat architecture with:

Reliable real-time communication

Optimistic UI with failure recovery

Strong state consistency

Clean separation of concerns

<<<<<<< HEAD
Scalable and extensible design
=======
Scalable and extensible design
>>>>>>> 01a8560 (fix:user interface design)
