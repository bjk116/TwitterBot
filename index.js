var Twit = require("twit");
var Keys = require("./keys");

var bot = new Twit({
		consumer_key: Keys.consumer_key,
		consumer_secret: Keys.consumer_secret,
		access_token: Keys.access_token,
		access_token_secret: Keys.access_token_secret,
		timeout_ms:60*1000
});

//To post a status
/*
	bot.post("statuses/update", {status: "Hello World!"},
		function(err, data, response){
			if(err){
				console.log(err);
			} else {
				console.log(data.text + " was tweeted.");
			}
		});
*/

//To get followers by ids
/*
	bot.get("followers/ids", {screen_name: "bkchak"},
		function(err, data, response) {
			if(err){
				console.log(err);
			} else{
				console.log(data);
			}
	});
*/

//To get followers with lists
/*
	bot.get("followers/list", {screen_name: "bkchak"},
		function(err, data, response) {
			if(err){
				console.log(err);
			} else{			
				data.users.forEach(function(user) {
					console.log("Screenname: " + user.screen_name + " Real Name: " + user.name);
					//users current status object
					console.log(user.status);
				});
			}
		}
	);
*/

//A bot should only follow users that follow taht bot

//To follow someone
/*
	bot.post("friendships/create", {screen_name: "SenSanders"},
		function(err, data, response){
			if(err){
				console.log(err);
			} else {
				console.log(data);
			}
		}
	);
*/

//To get friends by Id/List
/*
bot.get("friends/list", {screen_name: "bkchak"},
	function(err, data, response) {
		if(err){
			console.log(err);
		} else {
			console.log(data);
		}
	});
*/

//To get the relation between us and a specific user
//useful for following people who don't have the following connection
/*
bot.get("friendships/lookup", {screen_name:"LeeCamp"},
	function(err, data, response) {
		if(err){
			console.log(err);
		} else{
			console.log(data);
		}
	});
*/

//Never DM someone who's not following your bot
//How to DM someone
/*
bot.post("direct_messages/new", {screen_name:""},
	function(err, data, response){
		if(err){
			console.log(err);
		} else{
			console.log(data);
		}
	});
*/

//Get home timeline
function getBotTimeline(){
	bot.get("statuses/home_timeline", {count: 1},
		function(err, data, response){
			if(err){
				console.log(err);
			} else {
				data.forEach(function(d){
					console.log(d.text);
					console.log(d.user.screen_name);
					console.log(d.id_str);
					console.log("\n");
				})
			}
		});
}

// getBotTimeline();


//These all use d.id_str;
//How to rewteet
function retweetByID(id){
bot.post("statuses/retweet/:id", {id: id},
	function(err, data, response){
		if(err){
			console.log(err);
		} else {
			console.log(data.text + " was retweeted");
		}
	});	
}


//to like something
function likeTweetById(id){
	var id_str = "" + id;
	bot.post("favorites/create", {id: id_str},
		function(err, data,response){
			if(err){
				console.log(err);
			} else {
				console.log(data.text + " was liked.");
			}
		});	
}

function unlikeTweetById(id) {
	var id_str = "" + id;
	bot.post("favorites/destroy", {id: id_str},
		function(err, data,response){
			if(err){
				console.log(err);
			} else {
				console.log(data.text + " was unliked.");
			}
		});	
};

//To reply to a tweet
function replyToTweetById(replyTo, reply, id){
	var replyMessage = "@" + replyTo + " " + reply;
	bot.post("statuses/update", {status: replyMessage,
		in_reply_to_status_id: id},
		function(err, data, response) {
			if(err){
				console.log(err);
			} else {
				console.log(data);
			}
		}
	)
};

//to delete a tweet
function deleteTweetById(id) {
	bot.post("statuses/destroy/:id", {id: id},
		function(err, data, response){
			if(err){
				console.log(err);
			} else {
				console.log(data.text + " was deleted.");
			}
		});
}