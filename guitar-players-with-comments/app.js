// set up express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Guitarist = require('./models/guitarists/guitarist');
const Comment = require('./models/comments/comment');
const seedDb = require('./seed.js');

const app = express();
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); //using method-override + what to look for in url *the parentheses as above*

// connect to mognodb
mongoose.connect('mongodb://localhost:27017/guitarists', { useNewUrlParser: true, useFindAndModify: false });
seedDb();

// routes

app.get('/', (req, res) => {
	res.redirect('/guitarists');
});

// Index
app.get('/guitarists', (req, res) => {
	// we should get all the guitar players from the database and then pass them in to the index view
	let guitarists = Guitarist.find({}, (err, foundGuitarists) => {
		if (err) console.log(err);
		else {
			res.render('index', { guitarists: foundGuitarists });
		}
	});
});

// New

app.get('/guitarists/new', (req, res) => {
	res.render('guitarists/new');
});

// Create

app.post('/guitarists', (req, res) => {
	console.log(req.body);
	Guitarist.create(req.body.guitarist, (err, newGuitarist) => {
		if (err) console.log(err);
		else {
			res.redirect('/guitarists');
		}
	});
});

// Show

app.get('/guitarists/:id', (req, res) => {
	// have to get guitarist id from req.body
	let id = req.params.id;
	let foundGuitarist = Guitarist.findById(id, (err, foundGuitarist) => {
		if (err) console.log(err);
		else {
			let foundGuitaristWithPopulatedComments = Guitarist.findById(id)
				.populate('comments')
				.exec((err, populatedGuitarist) => {
					if (err) console.log(err);
					else {
						console.log(populatedGuitarist);
						res.render('guitarists/show', { guitarist: populatedGuitarist });
					}
				});
		}
	});
	// then have show template have markup for one guitarist
});

// edit
app.get('/guitarists/:id/edit', (req, res) => {
	// get guitarist from req.params.id
	let id = req.params.id;
	let foundGuitarist = Guitarist.findById(id, (err, foundGuitarist) => {
		if (err) console.log(err);
		else {
			res.render('guitarists/edit', { guitarist: foundGuitarist });
		}
	});
	// show edit template and pass in desired guitarist
});

// update
app.put('/guitarists/:id', (req, res) => {
	// get guitarist from req.params.id
	let id = req.params.id;
	let guitarist = req.body.guitarist;
	let foundGuitarist = Guitarist.findByIdAndUpdate(id, guitarist, (err, foundGuitarist) => {
		if (err) console.log(err);
		else {
			res.redirect('/');
		}
	});
	// show edit template and pass in desired guitarist
});

// delete
app.delete('/guitarists/:id', (req, res) => {
	let id = req.params.id;
	Guitarist.findByIdAndRemove(id, err => {
		if (err) console.log(err);
		else {
			res.redirect('/');
		}
	});
});

// comment routs

// new
app.get('/guitarists/:id/comments/new', (req, res) => {
	// show form to make new comment to user
	Guitarist.findById(req.params.id, (err, foundGuitarist) => {
		if (err) console.log(err);
		else {
			res.render('comments/new', { guitarist: foundGuitarist });
		}
	});
});

// create

app.post('/guitarists/:id/comments', (req, res) => {
	// find guitarist
	Guitarist.findById(req.params.id, (err, foundGuitarist) => {
		if (err) console.log(err);
		else {
			Comment.create(req.body.comment, (err, createdComment) => {
				if (err) console.log(err);
				else {
					console.log(createdComment);
					foundGuitarist.comments.push(createdComment);
					foundGuitarist.save();
					res.redirect(`/guitarists/${req.params.id}`);
				}
			});
		}
	});
	// add coment
	// guitarist.save
});

// listener

app.listen(8080, () => {
	console.log('server running on port 8080');
});
