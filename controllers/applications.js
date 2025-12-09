const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const { applications } = currentUser;

    res.render('applications/index.ejs', { applications });
  } catch (err) {
    res.redirect('/');
  }
});

// Create
router.get('/new', async (req, res) => {
  try {
    res.render('applications/new.ejs');
  } catch (error) {
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    // first find the current user
    const currentUser = await User.findById(req.session.user._id);

    // create the application payload
    // push the new application to the user.applications
    currentUser.applications.push(req.body);
    // await user.save()
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
  // redirect to apps index
});

router.get('/:id', async (req, res) => {
  try {
    // find the user
    const currentUser = await User.findById(req.session.user._id);
    // find the specific app in the apps array of the user
    const application = currentUser.applications.id(req.params.id);
    // render the template for that app
    res.render('applications/show.ejs', { application });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});
router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render('applications/edit.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put("/:id" , async (req , res) =>{
  try{
    const currentUser = await User.findById(req.session.user._id)
  const application = currentUser.applications.id(req.params.id)

  application.set(req.body);
  await currentUser.save();
  `/users/${currentUser._id}/applications/${req.params.applicationId}`
  }
  catch(error){
    console.error(error)
  }
  
})

router.delete('/:id', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.applications.id(req.params.id).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});



module.exports = router;
