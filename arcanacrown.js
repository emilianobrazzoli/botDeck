	var Discord = require('discord.io');
	var logger = require('winston');
	//var auth = require('./auth.json');   // for local
	var gestional = require('./gestional.js');
        


	logger.level = 'debug';

	//Initialize Discord Bot
	var bot = new Discord.Client({
	    token:  process.env.TOKEN, 
	    autorun: true
	});

	//auth code local
	// var bot = new Discord.Client({
	//     token: auth.token, 
	//     autorun: true
	// });


	
	bot.on('ready', function(evt) {
	    logger.info('Connected');
	    logger.info('Logged in as: ');
	    logger.info(bot.username + ' - (' + bot.id + ')');
	});

	bot.on('message', function(user, userID, channelID, message, evt) {
		
		// Our bot needs to know if it will execute a command
		// It will listen for messages that will start with `/d`
        if (message.substring(0, 2) == '/d') {
			var respond = gestional.command(userID, channelID, message);
			
			bot.sendMessage({
				to: respond.where,
				message: '<@'+respond.who+'> '+ respond.what
			});
		}
	});
	