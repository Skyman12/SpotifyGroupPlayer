(function () {
    var audio = new Audio();

    function searchTracks(query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track'
            },
            success: function (response) {
                if (response.tracks.items.length) {
                    var track = response.tracks.items[0];
                    audio.src = track.preview_url;
                    audio.play();
                    communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
                }
            }
        });
    }

    function login() {
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
               console.log("here");
            }
        });
    }

    function playSong(songName, artistName) {
        var query = songName;
        if (artistName) {
            query += ' artist:' + artistName;
        }

        searchTracks(query);
    }

    function communicateAction(text) {
        var rec = document.getElementById('conversation');
        rec.innerHTML += '<div class="action">' + text + '</div>';
    }

    function recognized(text) {
        var rec = document.getElementById('conversation');
        rec.innerHTML += '<div class="recognized"><div>' + text + '</div></div>';
    }

    if (annyang) {
        // Let's define our first command. First the text we expect, and then the function it should call
		
		var hello = function() {
		  console.log("Hi there");
		};
		
		 var commands = {
      'hello (there)':        hello
		};
	
        /*var commands = {
            'stop': function () {
                audio.pause();
            },
                'play track *song': function (song) {
                recognized('Play track ' + song);
                playSong(song);
            },
                'play *song by *artist': function (song, artist) {
                recognized('Play song ' + song + ' by ' + artist);
                playSong(song, artist);
            },
                'play song *song': function (song) {
                recognized('Play song ' + song);
                playSong(song);
            },
                'play *song': function (song) {
                recognized('Play ' + song);
                playSong(song);
            },
                'login': function () {
                recognized('Log in ');
                login();
            },
                ':nomatch': function (message) {
                recognized(message);
                communicateAction('Sorry, I don\'t understand this action');
            },
			
			
			
        };*/

        // Add our commands to annyang
        annyang.addCommands(commands);
		annyang.debug();
		annyang.setLanguage('en');
		
        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
		console.log("started");
    }

    annyang.addCallback('error', function () {
        communicateAction('error');
    });
})();
