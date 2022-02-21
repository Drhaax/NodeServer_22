const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose')
const e = require('express')
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('survey')

module.exports = app => {
	app.get(
		'/api/survey/thanks',
		(req,res) => {
			res.send("Thanks for voting");
		}
	);

	app.post(
		'/api/survey', 
		requireLogin,
		requireCredits,
		async (req, res) => {
			const { title, subject, body, recipients } = req.body;

			const survey = Survey({
				title,
				subject,
				body,
				recipients: recipients.split(',').map(email => ({email: email.trim()})),
				_user: req.user.id,
				dateSent: Date.now()
			});

			const mailer = new Mailer(survey, surveyTemplate(survey));
			
			try{
				await mailer.send();
				console.log("mailer: ");
				await survey.save();
				console.log("survey: ");

				req.user.credits -= 1;
				const usr = await req.user.save();
				
				res.send(usr);
			}
			catch(err){
				res.status(422).send(err);
			}
		}
	);
	
}	