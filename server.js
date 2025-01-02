const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Настройка Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Статическая папка для доступа к файлам
app.use(express.static('public'));

// Сервер WebSocket
io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    // Передача изображения всем подключённым пользователям
    socket.on('canvas-data', (data) => {
        // Отправка данных всем клиентам
        socket.broadcast.emit('canvas-data', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Запуск сервера на порту 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
