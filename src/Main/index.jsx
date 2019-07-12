import React, {Component} from 'react';
import '../Main/index.scss';
import DrumPad from './DrumPad';
import DrumPanel from './DrumPanel';
import Audio from './Audio';
import {buttons, URL} from '../constants';

class Main extends Component {
  state = {
    buttons: {
      Q: {
        drum: 'Heater-1.mp3',
        piano: 'Chord_1.mp3',
        drumName: 'Heater 1',
        pianoName: 'Chord 1',
      },
      W: {
        drum: 'Heater-2.mp3',
        piano: 'Chord_2.mp3',
        drumName: 'Heater 2',
        pianoName: 'Chord 2',
      },
    },
    bank: false,
    defaultVolume: '0.1',
    power: true,
    press: false,
    pressValue: '',
    screen: 'Heater Kit',
    src: '',
  };

  handleButtons = ev => {
    let track = ev.target.children[0];
    let screen = ev.target.id;
    track.paused ? track.play() : (track.currentTime = 0);
    this.setState({screen});
    this.press(track);
  };
  onKeyDown = event => {
    let id = String.fromCharCode(event.keyCode);
    let track = document.getElementById(id);
    if (track && this.state.power) {
      let screen = track.parentNode.id;
      track.paused ? track.play() : (track.currentTime = 0);
      this.setState({screen});
      this.press(track);
    }
  };
  press = track => {
    this.setState({
      press: !this.state.press,
      pressValue: track,
    });
    setTimeout(() => {
      this.setState({
        press: !this.state.press,
        pressValue: '',
      });
    }, 100);
  };
  switchTool = () => {
    let screen = this.state.bank ? 'Heater Kit' : 'Smooth Piano Kit';
    this.setState({
      bank: !this.state.bank,
      screen,
    });
  };
  switchPower = () => {
    let volume = document.getElementById('vol').value;
    let tracks = [...document.querySelectorAll('audio')];
    for (let track of tracks) {
      if (this.state.power) {
        track.currentTime = 0;
        track.muted = true;
        track.pause();
      } else {
        track.muted = false;
        track.volume = volume;
      }
    }
    this.setState({
      power: !this.state.power,
      screen: '',
    });
  };
  inicializationSet = () => {
    let defaultVolume = this.state.defaultVolume;
    let tracks = document.querySelectorAll('audio');
    for (let track of tracks) {
      track.volume = defaultVolume;
    }
  };
  changeVolume = e => {
    let tracks = document.querySelectorAll('audio');
    let volume = e.target.value;
    let screen = `Volume : ${(Number(volume) * 100).toFixed()}`;
    for (let track of tracks) {
      track.volume = volume;
    }
    this.setState({screen});
  };
  componentDidMount() {
    this.inicializationSet();
    console.log('Inicialization !');
  }

  play = ev => {
    let button, src, screen;
    let buttons = this.state.buttons;
    let audio = this.audio;
    if (ev.type === 'keydown' && ev.keyCode > 32) {
      button = String.fromCharCode(ev.keyCode);
    } else if (ev.type === 'click') {
      button = ev.target.id;
    }
    if (button in this.state.buttons) {
      src = this.state.bank
        ? URL + buttons[button].piano
        : URL + buttons[button].drum;
      screen = this.state.bank
        ? buttons[button].pianoName
        : buttons[button].drumName;
      Promise.resolve()
        .then(() => {
          this.setState({src, screen});
        })
        .then(() => {
          audio.paused ? audio.play() : (audio.currentTime = 0);
          this.press(button);
        });
    }
  };

  render() {
    return (
      <div className="container" tabIndex="0" onKeyDown={this.play}>
        <nav className="navigation">
          <a
            href="https://github.com/cooldaynow/drum-machine"
            title="Link to GitHub">
            Drum Machine for Free Code Camp
          </a>
        </nav>
        <div id="drum-machine" className="wrap__drum__machine">
          <DrumPad
            buttons={this.state.buttons}
            bank={this.state.bank}
            press={this.state.press}
            pressValue={this.state.pressValue}
            power={this.state.power}
            handleButtons={this.handleButtons}
            play={this.play}
          />
          <DrumPanel
            power={this.state.power}
            screen={this.state.screen}
            switchPower={this.switchPower}
            switchTool={this.switchTool}
            changeVolume={this.changeVolume}
            defaultVolume={this.state.defaultVolume}
            bank={this.state.bank}
          />
          <Audio ref={ref => (this.audio = ref)} src={this.state.src} />
        </div>
      </div>
    );
  }
}

export default Main;
