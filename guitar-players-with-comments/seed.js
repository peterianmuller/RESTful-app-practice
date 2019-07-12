const mongoose = require('mongoose');
const Guitarist = require('./models/guitarists/guitarist.js');
const Comment = require('./models/comments/comment');

let guitarists = [
	{
		name: `Stevie Ray`,
		bio: `Lorem ipsum dolor amet distillery ethical biodiesel poutine church-key man bun pork belly pickled post-ironic air plant kickstarter street art coloring book taiyaki. Mustache forage skateboard truffaut kogi, umami shaman meh knausgaard bicycle rights vexillologist taxidermy live-edge vaporware viral. Lo-fi meggings paleo, artisan green juice portland mumblecore occupy mustache pickled ennui. Farm-to-table chartreuse blue bottle literally fanny pack migas yr.`
	},
	{
		name: `Jimi`,
		bio: `Leggings bespoke williamsburg flexitarian, glossier fingerstache kale chips fashion axe food truck farm-to-table polaroid actually iPhone vaporware. Iceland thundercats taiyaki, schlitz palo santo selvage lyft synth slow-carb locavore fixie freegan bushwick. Vexillologist direct trade coloring book butcher hashtag street art. Quinoa salvia ennui yr before they sold out, blog la croix. Jianbing readymade 90's, slow-carb chia selfies prism synth portland woke street art tote bag.`
	},
	{
		name: `Gusatvo Cerati`,
		bio: `Viral cronut four loko, man bun tousled irony subway tile offal. Waistcoat paleo hoodie, PBR&B artisan offal church-key pork belly meditation bitters whatever cred asymmetrical. Viral sustainable cornhole, freegan man braid farm-to-table letterpress blog synth tumblr. Hexagon VHS umami, hashtag biodiesel cray shoreditch shaman yr. Master cleanse brunch four loko, selvage mlkshk umami literally. Helvetica fingerstache cliche chillwave direct trade vice mustache thundercats gochujang vinyl offal YOLO activated charcoal. Waistcoat single-origin coffee yr kickstarter lomo slow-carb, green juice franzen pitchfork twee whatever enamel pin kogi salvia fashion axe.`
	}
];

// Seed file!

// Goal is to wipe database and then create three guitarists with comments

seedDb = () => {
	Guitarist.deleteMany({}, err => {
		if (err) console.log(err);
		else {
			// let's also delete comments here
			Comment.deleteMany({}, err => {
				if (err) console.log(err);
				else {
					guitarists.forEach(guitarist => {
						Guitarist.create(guitarist, (err, createdGuitarist) => {
							if (err) console.log(err);
							else {
								// create new comment
								Comment.create(
									{
										author: 'bill',
										text:
											'Disrupt cray unicorn sustainable, kinfolk tacos sartorial. Cloud bread meh art party, organic bespoke williamsburg tacos lo-fi la croix trust fund raw denim chicharrones aesthetic. '
									},
									(err, createdComment) => {
										if (err) console.log(err);
										else {
											createdGuitarist.comments.push(createdComment);
											createdGuitarist.save();
										}
									}
								);
							}
						});
					});
				}
			});
		}
	});
};

module.exports = seedDb;
