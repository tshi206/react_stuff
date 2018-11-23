const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @description Get all items
// @access Public
router.get("/", async (req, res) => {
    const items = await Item.find().sort({ date: -1 }); // -1 means sort by descending order, on the date field of each document in this case
    res.json(items)
});

// @route POST api/items
// @description Create an Item document
// @access Public
router.post("/", async (req, res) => {
    const newItem = new Item({
        // request payload is parsed by body parser middleware since we have enabled it in the server.js
        name: req.body.name, // date is set by default
    });
    const itemCreated = await newItem.save();
    res.json(itemCreated)
});

// @route DELETE api/items by __id via URL Param
// @description Delete an Item document by __id
// @access Public
router.delete("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        const result = await item.remove();
        res.json({
            success: true,
            result
        })
    } catch (e) {
        res.status(404).json({
            success: false,
            Error: e
        })
    }
});

// @route DELETE api/items by 'name' via query string
// @description Delete an Item document by 'name'
// @access Public
router.delete("/", async (req, res) => {
    try {
        const item = await Item.findOne({ name: req.query.name });
        const result = await item.remove();
        res.json({
            success: true,
            result
        })
    } catch (e) {
        res.status(404).json({
            success: false,
            Error: e
        })
    }
});

module.exports = router;