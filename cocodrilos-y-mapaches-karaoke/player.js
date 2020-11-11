/* Responsive Audio Player
   Mark Hillard https://codepen.io/markhillard/pen/Hjcwu
   Edited.

CodePen license:

Copyright (c) Mark Hillard https://codepen.io/markhillard/pen/Hjcwu

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

*/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'files/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Vamos al Cole (Karaoke)",
                "duration": "00:52",
                "file": "01 - Vamos al Cole (Karaoke)"
            }, {
                "track": 2,
                "name": "La Tirita (Karaoke)",
                "duration": "00:51",
                "file": "02 - La Tirita (Karaoke)"
            }, {
                "track": 3,
                "name": "Anoche No Me Dormía (Karaoke)",
                "duration": "01:33",
                "file": "03 - Anoche No Me Dormia (Karaoke)"
            }, {
                "track": 4,
                "name": "Patatas Fritas (Karaoke)",
                "duration": "01:13",
                "file": "04 - Patatas Fritas (Karaoke)"
            }, {
                "track": 5,
                "name": "El Avión (Karaoke)",
                "duration": "01:05",
                "file": "05 - El Avion (Karaoke)"
            }, {
                "track": 6,
                "name": "Dinoviembre (Karaoke)",
                "duration": "01:10",
                "file": "06 - Dinoviembre (Karaoke)"
            }, {
                "track": 7,
                "name": "Despierto (Karaoke)",
                "duration": "01:14",
                "file": "07 - Despierto (Karaoke)"
            }, {
                "track": 8,
                "name": "Es Invierno (Karaoke)",
                "duration": "00:58",
                "file": "08 - Es Invierno (Karaoke)"
            }, {
                "track": 9,
                "name": "Cocodrilos Y Mapaches (Karaoke)",
                "duration": "01:22",
                "file": "09 - Cocodrilos y Mapaches (Karaoke)"
            }, {
                "track": 10,
                "name": "Mi Tortuga Come Gambillas (Karaoke)",
                "duration": "01:15",
                "file": "10 - Mi Tortuga Come Gambillas (Karaoke)"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text('Reproduciendo: ' + tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});

