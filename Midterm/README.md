# Youtube Trending Twitter Bot

This is a bot that uses twitter to post the #1 trending video on youtube in a random country. The bot pulls from the currently 91 available contries from the youtube api. Once started, the bot will post automatically every hour.

## Steps to run this app

1. You will first need to apply for a Twitter developer's key and sign up for a youtube api key.
2. You will also need Nodejs installed and install the 'Twit' package using a command such as 'npm install Twit' in your terminal.
3. Download the bot.js file and create two files called 'config.js' and 'youtubeKey.js'. In the config.js file you will input your api_key that you have recieved from twitter. The format of the key can be found on the npm Twit page [link](https://www.npmjs.com/package/twit) and input your youtube api key in 'youtubeKey.js'
4.Once you have all of that set up you should be able to run bot.js in your terminal using 'node bot.js'. This will cause the bot to post once every hour, choosing a random country's top trending video.
5.If you would like to change the intervals at which it is posting, you can modify the time in the setInterval function at the bottom.
