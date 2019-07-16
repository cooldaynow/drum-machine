import React, {Component} from 'react';
import '../Main/index.scss';
import DrumPad from './DrumPad';
import DrumPanel from './DrumPanel';
import {buttons, URL} from '../constants';

class Main extends Component {
  state = {
    buttons,
    bank: false,
    defaultVolume: '0.3',
    power: true,
    press: false,
    pressValue: '',
    screen: 'Heater Kit',
    src: '',
  };

  press = button => {
    this.setState({
      press: !this.state.press,
      pressValue: button,
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
    this.setState({
      power: !this.state.power,
      screen: '',
    });
  };
  inicializationSet = () => {
    this.audio.volume = this.state.defaultVolume;
  };
  changeVolume = e => {
    let volume = e.target.value;
    let screen = `Volume : ${(Number(volume) * 100).toFixed()}`;
    this.audio.volume = volume;
    this.setState({screen});
  };

  play = async ev => {
    let button, src, screen;
    let buttons = this.state.buttons;
    let audio = this.audio;

    if (ev.type === 'keydown' && ev.keyCode > 32) {
      button = String.fromCharCode(ev.keyCode);
    } else if (ev.type === 'click') {
      button = ev.target.id;
    }
    if (button in this.state.buttons && this.state.power) {
      src = this.state.bank
        ? URL + buttons[button].piano
        : URL + buttons[button].drum;
      screen = this.state.bank
        ? buttons[button].pianoName
        : buttons[button].drumName;
      await this.setState({src, screen});
      audio.paused ? audio.play() : (audio.currentTime = 0);
      this.press(button);
    }
  };
  componentDidMount() {
    this.inicializationSet();
    console.log('Inicialization !');
  }
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
            press={this.state.press}
            pressValue={this.state.pressValue}
            power={this.state.power}
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
          <audio ref={ref => (this.audio = ref)} src={this.state.src} />
        </div>
      </div>
    );
  }
}

export default Main;
