import $ from 'jquery'
import CoolLyrics from './CoolLyrics'
import './css/main.styl'

let $root = $('[data-cool-lyrics]');
$root.each(function() {
  let sourceUrl = $(this).data('lyrics-src');
  let audioElement = $($(this).data('audio'))[0];

  let coolLyrics = new CoolLyrics(this);
  coolLyrics.setAudio(audioElement);
  if (sourceUrl) {
    $.ajax({
      url: sourceUrl,
      dataType: 'text'
    }).done(function(dataStr) {
      coolLyrics.setLyrics(dataStr);
    });
  } else {
    coolLyrics.setLyrics(this.innerText);
  }
});