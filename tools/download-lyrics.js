const http = require('http');

if (process.argv.length <= 2) {
  process.stderr.write("Usage: node download-lyrics.js <song-id>\n");
  process.stderr.write("  <song-id>: The song id which can be found using share link in 163Music.\n");
  process.exit();
}
const lyricsApiBaseUrl = "http://music.163.com/api/song/media?id=";
let songId = process.argv[2];
http.get(lyricsApiBaseUrl + songId, (res) => {
  let dataStr = '';
  res.on('data', (chunk) => {
    dataStr += chunk;
  });
  res.on('end', () => {
    data = JSON.parse(dataStr);
    process.stdout.write(data.lyric + "\n");
  });
}).on('error', (err) => {
  process.stderr.write("Error: " + err.message);
});