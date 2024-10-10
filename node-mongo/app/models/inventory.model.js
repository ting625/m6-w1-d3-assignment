const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    title: String,
    author: String
}, {
    versionKey: false // Disable the __v field
}); 

module.exports = mongoose.model('Inventory', InventorySchema);