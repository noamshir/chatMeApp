const express = require('express');

const { requireAuthentication } = require('../../middleware/auth');
const { addChat, getUserChats, updateChat } = require('./chat.controller');

const router = express.Router();
router.get('/user-chats', requireAuthentication, getUserChats);
router.put('/', requireAuthentication, updateChat);
router.post('/', requireAuthentication, addChat);
module.exports = router;
