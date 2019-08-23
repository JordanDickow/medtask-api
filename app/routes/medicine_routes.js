const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for activities
const Medicine = require('../models/medicine')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { activity: { title: '', text: 'foo' } } -> { activity: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// SIGN UP
// POST / create medicines
router.post('/medicines', requireToken, (req, res, next) => {
  req.body.medicine.owner = req.user.id
  Medicine.create(req.body.medicine)
    .then(Medicine => {
      res.status(201).json({ medicine: Medicine.toObject() })
    })
    .catch(next)
})
router.get('/medicines', requireToken, (req, res, next) => {
  Medicine.find({owner: req.user.id})
    .then(medicines => {
      // `activities` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return medicines.map(activity => activity.toObject())
    })
    // respond with status 200 and JSON of the activities
    .then(medicines => res.status(200).json({ medicines: medicines }))
    // if an error occurs, pass it to the handler
    .catch(next)
})
router.get('/activities/:id', requireToken, (req, res, next) => {
  Medicine.findById(req.params.id)
    .then(handle404)
    .then(medicine => res.status(200).json({ medicine: medicine.toObject() }))
    .catch(next)
})
router.patch('/medicines/:id', requireToken, removeBlanks, (res, req, next) => {
  delete req.body.medicine.owner
  Medicine.findById(req.params.id)
    .then(handle404)
    .then(medicine => {
      requireOwnership(req, medicine)
      return medicine.update(req.body.medicine)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
router.delete('/medicines/:id', requireToken, (req, res, next) => {
  Medicine.FindById(req.params.id)
    .then(handle404)
    .then(medicine => {
      requireOwnership(req, medicine)
      medicine.remove()
    })
    .then(() => res.senStatus(204))
    .catch(next)
})

module.exports = router
