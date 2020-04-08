var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `!`
	if (message.substring(0, 2) == 'g!') {
		var args = message.substring(2).split(' ');
		var cmd = args[0];
		var ans = ['y', 'g'];

	  var sentence = args.splice(1);
		args = args.splice(1);
		switch(cmd) {
			case 'tanya':
				var rnd = Math.floor(Math.random() * 2);
				var jawaban = ans[rnd];
				bot.sendMessage({
					to: channelID,
					message: '*' + jawaban + '*'
				});
			break;

			case 'tim':
				sentence.sort(() => Math.random() - 0.5);
				sentence.splice(5);
				bot.sendMessage({
					to: channelID,
					message: '*yang main ini yaa : ' + sentence + '*'
				});
			break;

			default:
				bot.sendMessage({
					to: channelID,
					message: '*command apaan anjing itu*'
				});
			break;
			// Just add any case commands if you want to..
		 }
	 }
});