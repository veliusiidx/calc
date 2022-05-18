import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Container, Row, Col, FormControl, Form, Button} from 'react-bootstrap';
import './bootstrap.min.css';

class GNCalc extends React.Component {
  constructor() {
    super();
    this.calc = this.calc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {values: {
        lane: 0,
        y: 480,
        h: 2,
        scroll: 100
      },
      convert: 'lr2toiidx'
    };
  }

  calc() {
    const values = this.state.values;
    let a = parseFloat(10 * (2173/725 * 1000));
    let y = parseFloat(this.state.values.y);
    let h = parseFloat(this.state.values.h);
    let yh = y + h;
    let green = parseFloat(this.state.values.aciidxgn);
    let scroll = parseFloat(this.state.values.scroll);
    let lane = parseFloat(this.state.values.lane);
    let highspeed = parseFloat(this.state.values.lr2hs);
    let hsandscroll = highspeed * scroll;
    let b = yh / hsandscroll;
    let c = parseFloat(1 - (lane / 100));
    let GN = a * b * c;

    if (this.state.convert === "lr2toiidx") {
      values['aciidxgn'] = GN;
      this.setState({values: values});
    } 

    if (this.state.convert === "iidxtolr2") {
      let bb = parseFloat((y + h) / (green * scroll));
      let HS = parseFloat(a * bb * c);
      values['lr2hs'] = HS;
      this.setState({values: values});
    }
  }

  handleChange(evt) {
    const values = this.state.values;
    values[`${evt.target.name}`] = evt.target.value;
    this.setState({values: values});
    this.calc();
  }

  handleDrop(evt) {
    let convType = evt.target.value;
    this.setState({convert: convType});
  }

  render() {

    return (

      <Table striped bordered condensed>
        <tr>
        <td>Conversion Type</td>
        <td>
          <Form.Control as="select" value={this.state.convert} onChange={this.handleDrop} >
            <option value="lr2toiidx">LR2 to AC IIDX</option>
            <option value="iidxtolr2">AC IIDX to LR2</option>
           </Form.Control>
        </td>
        <td>Either LR2 to ACIIDX or ACIIDX to LR2</td>
        </tr>

        <tr>
        <td>LR2 HIGHSPEED</td>
        <td><FormControl type="text" value={this.state.values.lr2hs} name="lr2hs" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>The HS setting you use in LR2. Only use this form if you want to calculate your AC IIDX GN equivalent.</td>
        </tr>

        <tr>
        <td>AC IIDX GREEN NUMBER</td>
        <td><FormControl type="text" value={this.state.values.aciidxgn} name="aciidxgn" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>The GN setting you use in AC IIDX. Only use this form if you want to calculate your LR2 HS equivalent.</td>
        </tr>

        <tr>
        <td>DST_LINE.y</td>
        <td><FormControl type="text" value={this.state.values.y} name="y" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>Open your lr2skin csv file, CTRL+F #DST_LINE and enter the <b>4th</b> number. IE: DST_LINE,0,0,25,<b>320</b>,144,1. Default: W-MIX</td>
        </tr>

        <tr>
        <td>DST_LINE.h</td>
        <td><FormControl type="text" value={this.state.values.h} name="h" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>Open your lr2skin csv file, CTRL+F #DST_LINE and enter the <b>6th</b> number. IE: DST_LINE,0,0,25,320,144,<b>1</b>. Default: W-MIX</td>
        </tr>

        <tr>
        <td>BASE SPEED (LR2)</td>
        <td><FormControl type="text" value={this.state.values.scroll} name="scroll" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>Found in the Options tab before starting LR2.</td>
        </tr>

        <tr>
        <td>LANE COVER (LR2)</td>
        <td><FormControl type="text" value={this.state.values.lane} name="lane" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>The amount of lane cover you use in LR2 from 0-100.</td>
        </tr>

      </Table>
    )
  }
}

class WNCalc extends React.Component {
  constructor() {
    super();
    this.calc = this.calc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {values: {
        y: 480,
        h: 2,
        w: 377,
        lr2x: 1280,
        lr2y: 720,
        winx: 1920,
        winy: 1080
      },
      convert: 'lr2toiidx'
    };
  }

  calc() {
    const values = this.state.values;
    let y = parseFloat(this.state.values.y);
    let h = parseFloat(this.state.values.h);
    let w = parseFloat(this.state.values.w);
    let white = parseFloat(this.state.values.aciidxwn);
    let lane = parseFloat(this.state.values.lane);
    let lr2x = parseFloat(this.state.values.lr2x);
    let lr2y = parseFloat(this.state.values.lr2y);
    let winx = parseFloat(this.state.values.winx);
    let winy = parseFloat(this.state.values.winy);
    let Rlr2 = parseFloat(lr2x / lr2y);
    let Rwin = parseFloat(winx / winy);

    if (this.state.convert === "lr2toiidx") {
      let WN = 1000 * (1 - (288/482) * ((y+h)/w) * (Rlr2/Rwin) * (1 - lane/100))
      values['aciidxwn'] = WN;
      this.setState({values: values});

    } 
    if (this.state.convert === "iidxtolr2") {
      let LR2LANE = 100 * (1 - (482/288) * (w/(y+h)) * (Rwin/Rlr2) * (1 - white/1000));
      values['lane'] = LR2LANE;
      this.setState({values: values});
    }

  }

  handleChange(evt) {
    const values = this.state.values;
    values[`${evt.target.name}`] = evt.target.value;
    this.setState({values: values});
    this.calc();
  }

  handleDrop(evt) {
    let convType = evt.target.value;
    this.setState({convert: convType});
  }

  render() {

    return (

      <Table striped bordered condensed >

        <tr>
        <td>Conversion Type</td>
        <td>
          <Form.Control as="select" value={this.state.convert} onChange={this.handleDrop} >
            <option value="lr2toiidx">LR2 to AC IIDX</option>
            <option value="iidxtolr2">AC IIDX to LR2</option>
           </Form.Control>
        </td>
        <td>Either LR2 to ACIIDX or ACIIDX to LR2</td>
        </tr>

        <tr>
        <td>LR2 LANE COVER</td>
        <td><FormControl type="text" value={this.state.values.lane} name="lane" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>The Lane Cover setting you use in LR2. Only use this form if you want to calculate your AC IIDX WN equivalent.</td>
        </tr>

        <tr>
        <td>AC IIDX WHITE NUMBER</td>
        <td><FormControl type="text" value={this.state.values.aciidxwn} name="aciidxwn" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>The WN setting you use in AC IIDX. Only use this form if you want to calculate your LR2 Lane Cover equivalent.</td>
        </tr>

        <tr>
        <td>DST_LINE.y</td>
        <td><FormControl type="text" value={this.state.values.y} name="y" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>Open your lr2skin csv file, CTRL+F #DST_LINE and enter the <b>4th</b> number. IE: DST_LINE,0,0,25,<b>320</b>,144,1. Default: W-MIX Wide</td>
        </tr>

        <tr>
        <td>DST_LINE.w</td>
        <td><FormControl type="text" value={this.state.values.w} name="w" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>Open your lr2skin csv file, CTRL+F #DST_LINE and enter the <b>5th</b> number. IE: DST_LINE,0,0,25,320,<b>144</b>,1. Default: W-MIX Wide</td>
        </tr>

        <tr>
        <td>DST_LINE.h</td>
        <td><FormControl type="text" value={this.state.values.h} name="h" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>Open your lr2skin csv file, CTRL+F #DST_LINE and enter the <b>6th</b> number. IE: DST_LINE,0,0,25,320,144,<b>1</b>. Default: W-MIX Wide</td>
        </tr>

        <tr>
        <td>LR2 Resolution X</td>
        <td><FormControl type="text" value={this.state.values.lr2x} name="lr2x" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>Found in the Options tab before starting LR2. Usually it's 640 for SD and 1280 or 1920 for LR2HD.</td>
        </tr>

        <tr>
        <td>LR2 Resolution Y</td>
        <td><FormControl type="text" value={this.state.values.lr2y} name="lr2y" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>Found in the Options tab before starting LR2. Usually it's 480 for SD and 720 or 1080 for LR2HD.</td>
        </tr>

        <tr>
        <td>LR2 Window X</td>
        <td><FormControl type="text" value={this.state.values.winx} name="winx" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>This is the size of the window LR2 is run at. Should be your monitor size if running the game full screen.</td>
        </tr>

        <tr>
        <td>LR2 Window Y</td>
        <td><FormControl type="text" value={this.state.values.winy} name="winy" placeholder="Enter text" onChange={this.handleChange} /></td>
        <td>This is the size of the window LR2 is run at. Should be your monitor size if running the game full screen.</td>
        </tr>

      </Table>
    )
  }
}

class CalcForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {switch: false};
  }

  handleChange() {
    if (!this.state.switch) {
      this.setState({switch: true});
    } else {
      this.setState({switch: false});
    }
  }

  render() {
    let calculator
    let calctype
    if (this.state.switch) {
      calctype = "Show Green Number Calculator"
      calculator = <WNCalc />
    } else {
      calctype = "Show White Number Calculator"
      calculator = <GNCalc />
    }
    return (
      <Container>
        <Row className="show-grid">
          <Button bsStyle="primary" bsSize="large" block className="calctoggle" onClick={this.handleChange}>
          {calctype}
          </Button>
          <Col xs={12} md={12}>{calculator}</Col>
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(<CalcForm />,document.getElementById('root'));