import React, {Component} from 'react';
import '../Main/index.scss';
import ToggleSwitch from './ToggleSwitch';
import Volume from './Volume';

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
    volume: '0.5',
    power: true,
    press: false,
    pressValue: '',
    name: 'Heater Kit',
  };
  renderButtons = () => {
    let src =
      'https://s3.amazonaws.com/freecodecamp/drums/';
    let bank = this.state.bank;
    let power = this.state.power;
    return this.state.buttons.map((but, i) => {
      return (
        <button
          className={
            this.state.press &&
            but.value === this.state.pressValue
              ? 'buttons press'
              : 'buttons'
          }
          id={bank ? but.pianoName : but.drumName}
          key={i + but.value}
          onClick={
            power ? this.handleButtons : undefined
          }>
          <audio
            id={but.value}
            src={
              bank
                ? src + but.piano
                : src + but.drum
            }
          />
          {but.value}
        </button>
      );
    });
  };
  delay = timeout => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeout);
    });
  };
  handleButtons = ev => {
    let audio = ev.target.children[0];
    let name = ev.target.id;
    audio.paused
      ? audio.play()
      : (audio.currentTime = 0);
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
    let name = this.state.bank
      ? 'Heater Kit'
      : 'Smooth Piano Kit';
    this.setState({
      bank: !this.state.bank,
      name: name,
    });
  };
  switchPower = () => {
    let audio = [
      ...document.getElementsByTagName('audio'),
    ];
    for (let track of audio) {
      if (this.state.power) {
        track.currentTime = 0;
        track.muted = true;
        track.pause();
      } else {
        track.muted = false;
      }
    }
    this.setState({
      power: !this.state.power,
      name: '',
    });
  };
  render() {
    let power = this.state.power;
    return (
      <div className="container">
        <div
          id="drum-machine"
          className="wrap__drum">
          <div className="left__side">
            <div className="drum__pad">
              {this.renderButtons()}
            </div>
          </div>
          <div className="right__side">
            <div className="drum__panel">
              <ToggleSwitch
                name="Power"
                toggle={power}
                handle={this.switchPower}
              />
              <div className="screen">
                {this.state.name}
              </div>
              <Volume
                volume={this.state.volume}
                disabled={!power}
              />
              <ToggleSwitch
                name="Bank"
                handle={
                  power
                    ? this.switchTool
                    : undefined
                }
                toggle={this.state.bank}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
