const Validator = require('fastest-validator');
const v = new Validator();
const express = require('express');
const router = express.Router();

// import models
const {Notes} = require('../models')

// get data
router.get('/', async (req, res, next) => {
 const note = await Notes.findAll();
 return res.json({
  status:200, message: "success get all data", data : note
 })
});

// get data by id
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  let note = await Notes.findByPk(id);

  if (!note) {
    return res.status(404).json({
      status: 404,
      message: "data not found"
    })
  }
  res.json({
    status:200, message: "success get data by id", data : note
   })
});

// post
router.post('/', async (req, res, next) => {
  // validation
  const schema = {
    title: "string",
    description: "string | optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  // proses create data 
  const note = await Notes.create(req.body);
  res.json({
    status: 200,
    message: "Success create data",
    data: note
  })
});

// put 
router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  let note = await Notes.findByPk(id);

  if (!note) {
    return res.status(404).json({
      status: 404,
      message: "data not found"
    })
  }

  // validation
  const schema = {
    title:"string",
    description: "string|optional"
  }
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }

  // update
  note = await note.update(req.body);
  res.json({
    status: 200,
    message: "Success update data",
    data: note
  })
});

// delete
// get data by id
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  let note = await Notes.findByPk(id);

  if (!note) {
    return res.status(404).json({
      status: 404,
      message: "data not found"
    })
  }
  note = await note.destroy()
  res.json({
    status:200, message: "success delete data"
   })
});


module.exports = router;
