const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    title: String,
    author: String
}); 

module.exports = mongoose.model('Inventory', InventorySchema);