/* eslint-disable no-undef */
import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

export default class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      brushColor: '#ff0000',
      brushSize: 10
    };
    this.canvas = null;
  }

  componentWillMount() {
    // dispatch some actions if you use Redux
  }

  componentDidMount() {
    this.init();
  }
  init = () => {
    this.canvas = new fabric.Canvas(document.getElementById('c'))
    this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, {
      width: this.state.brushSize,
      opacity: 0.5,
      color: this.state.brushColor
    });

    this.canvas.isDrawingMode = true;
  }
  handleChangeComplete = (color) => {
    this.setState({ brushColor: color.hex });
    this.canvas.freeDrawingBrush.color = color.hex;
  };

  handleRangeChange = value => {
    this.setState({
      brushSize: value
    });
    this.canvas.freeDrawingBrush.width = value;
  };

  render() {
    return (
      <div>
        <div style={{
          width: '100%',
          height: '70px'
        }}>
          <div
            style={{
              width: '70%'
            }}
          >
            <CirclePicker
              width={800}
              color={this.state.brushColor}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
          <div
            className='slider'
            style={{
              width: '20%'
            }}
          >
            <Slider
              min={0}
              max={100}
              value={this.state.brushSize}
              onChange={this.handleRangeChange}
            />
            <div className='value'>{this.state.brushSize}</div>
          </div>
        </div>
        <canvas
          id="c"
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: 'blue'
          }}
          width={window.screen.width - 200}
          height={window.screen.height - 200}
        >
        </canvas>
      </div>
    )
  }
}