const express = require('express')
const router = express.Router()

const Course = require('../models/Course')

// 添加数据
router.route('/add').post((req, res) => {
  const course = new Course(req.body)
  course.save().then(() => {
    res.status(200).json({'course': 'Course added successfully'})
  }).catch(err => {
    res.status(400).send("unable to save the course into database")
  })
})

// 获取所有数据
router.route('/').get((req, res) => {
  Course.find((err, courses) => {
    if (err) {
      console.log(err)
    } else {
      res.json(courses)
    }
  })
})

// 通过id修改指定数据
router.route('/update/:id').post((req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (!course) {
      return next(new Error('Could not load Document'))
    } else {
      course.course_name = req.body.course_name
      course.course_price = req.body.course_price

      course.save().then(() => {
        res.json('Successfully Updated')
      }).catch(err => {
        res.status(400).send("unable to update the database")
      })
    }
  })
})

// 删除数据
router.route('/delete/:id').get((req, res) => {
  Course.findByIdAndRemove({_id: req.params.id}, (err, course) => {
    if (err) {
      res.json(err)
    } else {
      res.json('Successfully removed')
    }
  })
})

module.exports = router;
