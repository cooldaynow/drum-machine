import React, {Component} from 'react';
import '../Main/index.scss';
import DrumPad from './DrumPad';
import DrumPanel from './DrumPanel';

class Main extends Component {
  state = {
    buttons: [
      {
        value: 'Q',
        drum: 'Heater-1.mp3',
        piano: 'Chord_1.mp3',
        drumName: 'Heater 1',
        pianoName: 'Chord 1',
      },
      {
        value: 'W',
        drum: 'Heater-2.mp3',
        piano: 'Chord_2.mp3',
        drumName: 'Heater 2',
        pianoName: 'Chord 2',
      },
      {
        value: 'E',
        drum: 'Heater-3.mp3',
        piano: 'Chord_3.mp3',
        drumName: 'Heater 3',
        pianoName: 'Chord 3',
      },
      {
        value: 'A',
        drum: 'Heater-4_1.mp3',
        piano: 'Give_us_a_light.mp3',
        drumName: 'Heater 4',
        pianoName: 'Shaker',
      },
      {
        value: 'S',
        drum: 'Heater-6.mp3',
        piano: 'Dry_Ohh.mp3',
        drumName: 'Clap',
        pianoName: 'Open-HH',
      },
      {
        value: 'D',
        drum: 'Dsc_Oh.mp3',
        piano: 'Bld_H1.mp3',
        drumName: 'Open-HH',
        pianoName: 'Closed-HH',
      },
      {
        value: 'Z',
        drum: 'Kick_n_Hat.mp3',
        piano: 'punchy_kick_1.mp3',
        drumName: "Kick-n'-Hat",
        pianoName: 'Punchy-Kick',
      },
      {
        value: 'X',
        drum: 'RP4_KICK_1.mp3',
        piano: 'side_stick_1.mp3',
        drumName: 'Kick',
        pianoName: 'Side-Stick',
      },
      {
        value: 'C',
        drum: 'Cev_H2.mp3',
        piano: 'Brk_Snr.mp3',
        drumName: 'Closed-HH',
        pianoName: 'Share',
      },
    ],
    bank: false,
    defaultVolume: '0.1',
    power: true,
    press: false,
    pressValue: '',
    screen: 'Heater Kit',
  };

  delay = timeout => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeout);
    });
  };
  handleButtons = ev => {
    let track = ev.target.children[0];
    let screen = ev.target.id;
    track.paused ? track.play() : (track.currentTime = 0);
    this.setState({screen: screen});
    this.press(track);
  };
  onKeyDown = event => {
    let id = String.fromCharCode(event.keyCode);
    let track = document.getElementById(id);
    if (track && this.state.power) {
      let screen = track.parentNode.id;
      track.paused ? track.play() : (track.currentTime = 0);
      this.setState({screen: screen});
      this.press(track);
    }
  };
  press = track => {
    Promise.resolve(1)
      .then(() => {
        this.setState({
          press: !this.state.press,
          pressValue: track.id,
        });
        return this.delay(100);
      })
      .then(() => {
        this.setState({
          press: !this.state.press,
          pressValue: '',
        });
      });
  };
  switchTool = () => {
    let screen = this.state.bank ? 'Heater Kit' : 'Smooth Piano Kit';
    this.setState({
      bank: !this.state.bank,
      screen: screen,
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
    this.setState({screen: screen});
  };
  componentDidMount() {
    this.inicializationSet();
    console.log('Inicialization !');
  }

  render() {
    return (
      <div className="container" tabIndex="0" onKeyDown={this.onKeyDown}>
        <nav className = "navigation" >
          <a href = 'https://github.com/cooldaynow/drum-machine' title = 'Link to GitHub' >
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
        </div>
      </div>
    );
  }
}

export default Main;
