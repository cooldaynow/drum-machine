import React, {Component} from 'react';
import '../Main/index.scss';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

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
    name: 'Heater Kit',
  };

  delay = timeout => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeout);
    });
  };
  handleButtons = ev => {
    let audio = ev.target.children[0];
    let name = ev.target.id;
    audio.paused ? audio.play() : (audio.currentTime = 0);
    this.setState({name: name});
    this.press(audio);
  };
  press = audio => {
    Promise.resolve(1)
      .then(() => {
        this.setState({
          press: !this.state.press,
          pressValue: audio.id,
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
    let name = this.state.bank ? 'Heater Kit' : 'Smooth Piano Kit';
    this.setState({
      bank: !this.state.bank,
      name: name,
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
      name: '',
    });
  };
  inicializationSet = () => {
    let defaultVolume = this.state.defaultVolume;
    let tracks = [...document.querySelectorAll('audio')];
    for (let track of tracks) {
      track.volume = defaultVolume;
    }
  };
  changeVolume = e => {
    let tracks = [...document.querySelectorAll('audio')];
    let volume = e.target.value;
    let renderVolume = `Volume : ${(Number(volume) * 100).toFixed()}`;
    for (let track of tracks) {
      track.volume = volume;
    }
    this.setState({name: renderVolume});
  };
  componentDidMount() {
    this.inicializationSet();
    console.log('component did mount');
  }
  render() {
    return (
      <div className="container">
        <div id="drum-machine" className="wrap__drum">
          <LeftSide
            buttons={this.state.buttons}
            bank={this.state.bank}
            press={this.state.press}
            pressValue={this.state.pressValue}
            power={this.state.power}
            handleButtons={this.handleButtons}
          />
          <RightSide
            power={this.state.power}
            name={this.state.name}
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
