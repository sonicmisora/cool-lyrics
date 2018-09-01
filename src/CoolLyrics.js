export default class CoolLyrics {
  /**
   * @param {HTMLElement} element Target HTML element. Necessary
   * @param {string} lyricsContent Lyrics content to be displayed
   * @param {HTMLAudioElement} audioElement Audio element to track the song
   */
  constructor(element, lyricsContent, audioElement) {
    this.element = element;
    this.rawLyrics = lyricsContent;
    this.setAudio(audioElement);

    this.element.classList.add('cool-lyrics');
    this.setTrackAudio(true);
    this._regenerateContents();
  }

  _regenerateContents() {
    this.lyricsData = {
      meta: {},
      body: []
    };
    if (this.rawLyrics) {
      this._parseLyrics();
    }
    // clear the main element
    this.element.innerHTML = "";
    // generate contents
    this.lyricsData.body.forEach((v, index, a) => {
      a[index].element = document.createElement('p');
      a[index].element.textContent = a[index].content;
      this.element.appendChild(a[index].element);
    });
    this.currentLineIndex = -1;
  }

  /**
   * @param {string} content
   */
  setLyrics(content) {
    this.rawLyrics = content;
    this._regenerateContents();
  }

  getLyrics() {
    return this.rawLyrics;
  }

  /**
   * @param {HTMLAudioElement} audioElement
   */
  setAudio(audioElement) {
    if (audioElement) {
      this.audioElement = audioElement;
      this.audioElement.ontimeupdate = () => {
        if (this.trackAudio) {
          this.setCurrentTime(this.audioElement.currentTime);
        }
      };
    } else {
      this.audioElement = null;
    }
  }

  getAudio() {
    return this.audioElement;
  }

  /**
   * Set the cursors to right places according to time.
   * @param {Number} time
   */
  setCurrentTime(time) {
    console.log("Time set: " + time);
    let newCurrentLineIndex = this._getLineIndexByTime(time);
    if (newCurrentLineIndex != this.currentLineIndex) {
      if (this.currentLineIndex != -1) {
        this.lyricsData.body[this.currentLineIndex].element.classList.remove('current');
      }
      if (newCurrentLineIndex != -1) {
        this.lyricsData.body[newCurrentLineIndex].element.classList.add('current');
      }
      this.currentLineIndex = newCurrentLineIndex;
    }
  }

  setTrackAudio(isTrack) {
    this.trackAudio = isTrack;
  }

  _parseLyrics() {
    // List of informations would like to be extracted
    const titleReg = /^ *\[ti:(.+)\] *$/;
    const creatorReg = /^ *\[by:(.+)\] *$/;
    const bodyReg = /^ *\[(\d\d):(\d\d)\.(\d\d)\] *(.+) *$/;
    // Iterate each line to collect information
    this.rawLyrics.match(/[^\r\n]+/g).forEach((line) => {
      let res;
      if (res = titleReg.exec(line)) {
        this.lyricsData.meta.title = res[1].trim();
      } else if (res = creatorReg.exec(line)) {
        this.lyricsData.meta.creator = res[1].trim();
      } else if (res = bodyReg.exec(line)) {
        let minute = parseInt(res[1].trim());
        let second = parseInt(res[2].trim());
        let msec = parseInt(res[3].trim());
        this.lyricsData.body.push({
          time: minute * 60 + second + msec / 100,
          content: res[4].trim()
        });
      }
    });
  }

  /**
   * @param {Number} time 
   */
  _getLineIndexByTime(time) {
    for (let i = 0; i < this.lyricsData.body.length; i++) {
      if (this.lyricsData.body[i].time > time) {
        return i - 1;
      }
    }
    return this.lyricsData.body.length - 1;
  }
}