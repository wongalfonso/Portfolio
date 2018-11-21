import React, { Component } from 'react';
import ReactGA from 'react-ga';

export default class ChangeCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: '',
      amountRec: '',
      twenties: '0',
      tens: '0',
      fives: '0',
      ones: '0',
      quarters: '0',
      dimes: '0',
      nickels: '0',
      pennies: '0',
      output: '0',
    }
    this.handleDue = this.handleDue.bind(this);
    this.handleRec = this.handleRec.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  gitHub() {
    ReactGA.event({
      category: 'Visited GitHub from Modal',
      action: 'From Change Modal'
    })
  }
  handleDue(event) {
    const amountDue = (event.target.validity.valid) ? event.target.value : this.state.amountDue;
    this.setState({ amountDue });
  }
  handleRec(event) {
    const amountRec = (event.target.validity.valid) ? event.target.value : this.state.amountRec;

    this.setState({ amountRec });
  }
  button() {
    if (this.state.amountRec.length > 0 && this.state.amountDue.length > 0) {
      return (
        <button className='change-form-foot-btn change-form-foot-btn-active'
          type='submit'
          onClick={this.calculate}>
          Calculate
        </button>
      )
    } else {
      return (
        <button className='change-form-foot-btn change-form-foot-btn-disabled'
          type='submit'
          disabled>
          Calculate
        </button>
      )
    }
  }
  calculate(e) {
    e.preventDefault();
    let twenties, tens, fives, ones, quarters, dimes, nickels, pennies, amountLeft;
    let amountDue = this.state.amountDue;
    let amountRec = this.state.amountRec;
    amountDue = parseFloat(amountDue);
    amountDue = amountDue * 100;
    amountRec = parseFloat(amountRec)
    amountRec = amountRec * 100;

    let amount = amountRec - amountDue;
    let amountRet3 = amountRec - amountDue;
    amountRet3 = amountRet3 / 100;
    amountRet3 = amountRet3.toFixed(2);



    if (amount > 1999) {
      twenties = amount / 2000
      amountLeft = amount % 2000;
      twenties = Math.floor(twenties)
      twenties = twenties.toFixed();
    } else {
      twenties = 0
    }
    if (amountLeft > 999) {
      tens = amountLeft / 1000;
      tens = Math.floor(tens);
      tens = tens.toFixed();
      amountLeft = amountLeft % 1000;
    } else {
      tens = 0
    }
    if (amountLeft > 499) {
      fives = amountLeft / 500;
      fives = Math.floor(fives);
      fives = fives.toFixed();
      amountLeft = amountLeft % 500;
    } else {
      fives = 0
    }
    if (amountLeft > 99) {
      ones = amountLeft / 100;
      ones = Math.floor(ones);
      ones = ones.toFixed();
      amountLeft = amountLeft % 100;
    } else {
      ones = 0
    }
    if (amountLeft > 24) {
      quarters = amountLeft / 25;
      quarters = Math.floor(quarters);
      quarters = quarters.toFixed();
      amountLeft = amountLeft % 25;
    } else {
      quarters = 0
    }
    if (amountLeft > 9) {
      dimes = amountLeft / 10;
      dimes = Math.floor(dimes);
      dimes = dimes.toFixed();
      amountLeft = amountLeft % 10;
    } else {
      dimes = 0
    }
    if (amountLeft > 4) {
      nickels = amountLeft / 5;
      nickels = Math.floor(nickels);
      nickels = nickels.toFixed();
      amountLeft = amountLeft % 5;
    } else {
      nickels = 0
    }
    if (amountLeft > .99) {
      pennies = amountLeft
      pennies = Math.floor(pennies);
    } else {
      pennies = 0
    }
    this.setState({
      twenties: twenties,
      tens: tens,
      fives: fives,
      ones: ones,
      quarters: quarters,
      dimes: dimes,
      nickels: nickels,
      pennies: pennies,
      output: amountRet3
    })
  }


  render() {
    var alert, leftOver, received;
    if (this.state.output > -1) {
      alert = 'alert alert-success changeOutcome';
      leftOver = 'The total change due is $';
    }
    if (this.state.output < 0) {
      alert = 'alert alert-danger changeOutcome';
      leftOver = 'You owe a balance of $';
    }
    if (this.state.amountRec === "") {
      received = 'form-group has-feedback has-error'
    } else {
      received = 'form-group has-feedback'
    }
    return (
      <div className="all-project-modals" id='changeCalcProject'>
        <div className="container">
          <header className="header">
            Change Calculator
            </header>
          <div className="content">
            <div className="change-form">
              <div className='change-form-head'>
                Enter Information
                </div>
              <form className='change-form-body'>
                <div className="change-form-body-group form-group">
                  <label className='change-input-label' htmlFor='amountDue'>
                    How much is due?
                  </label>
                  <input
                    type='text'
                    pattern='^([1-9]+)([0-9]*)(\.[0-9]{0,2})?$'
                    value={this.state.amountDue}
                    onChange={this.handleDue}
                    id='amountDue'
                    required
                  />
                </div>
                <div className='change-form-body-group form-group'>
                  <label htmlFor='received'>
                    How much was received?
                  </label>
                  <input
                    type='text'
                    pattern='^([1-9]+)([0-9]*)(\.[0-9]{0,2})?$'
                    value={this.state.amountRec}
                    onChange={this.handleRec}
                    id='received'
                    required />
                  <span className="glyphicon glyphicon-remove form-control-feedback">
                  </span>
                </div>
              </form>
              <div className='change-form-foot'>
                {this.button()}
              </div>
            </div>
            <div className='change-output'>
              <div className="change-output-header">
                {leftOver + this.state.output}
              </div>
              <div className="change-output-body">
                <div className="change-output-body-row">
                  <div className="change-output-body-row-label">
                    <div className='changeLabels'>Twenties</div>
                    <p className=''>    
                      {this.state.twenties}
                    </p>
                  </div>
                  <div className="change-output-body-row-label">
                    <div className='changeLabels'>Tens</div>
                    <p className=''>
                      {this.state.tens}
                    </p>
                  </div>
                  <div className="change-output-body-row-label">
                    <div className='changeLabels'>Fives</div>
                    <p className=''>
                      {this.state.fives}
                    </p>
                  </div>
                  <div className="change-output-body-row-label">
                    <div className='changeLabels'>Ones</div>
                    <p className=''>
                      {this.state.ones}
                    </p>
                  </div>
                </div>

                <div className="change-output-body-row">
                  <div className="change-output-body-row-label">
                    <div className='changeLabels'>Quarters</div>
                    <p className=''>
                      {this.state.quarters}
                    </p>
                  </div>
                  <div className="change-output-body-row-label">
                    <div className='changeLabels'>Dimes</div>
                    <p className=''>
                      {this.state.dimes}
                    </p>
                  </div>
                  <div className="change-output-body-row-label">
                    <div className='changeLabels'>Nickels</div>
                    <p className=''>
                      {this.state.nickels}
                    </p>
                  </div>
                  <div className="change-output-body-row-label">
                    <div className='changeLabels'>Pennies</div>
                    <p className=''>
                      {this.state.pennies}
                    </p>
                  </div>
                </div>
              </div>              
            </div>
          </div>
          <div className='project-close'>
            <div className="project-close-git">
              <a href="https://github.com/wongalfonso/React-Change-Calculator" target="_blank" onClick={this.gitHub}>
                <img className="gitMark" src="/images/GitHub.png" />
              </a>
            </div>
            <div className="project-close-btn">
              <button className='close-btn' 
                      onClick={this.props.close}>
                      Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};




{/* <div className='change-card'>
                <div className='change-card-body'>
                  <div className='row'>
                    <div className="col-lg-12">
                      <div className={alert}> {leftOver + this.state.output}
                      </div>
                    </div>
                  </div>
                  <div className='row change-output-row'>
                    <div className='col-3 ChangeOutputContainer'>
                      <div className='ChangeOutputLabels'>
                        <h1 className='changeLabels'>Twenties</h1>
                        <p className='lead changeOutputs'>{this.state.twenties}</p>
                      </div>
                    </div>
                    <div className='col-3 ChangeOutputContainer'>
                      <div className="ChangeOutputLabels">
                        <h1 className='changeLabels'>Tens</h1>
                        <p className='lead changeOutputs'>{this.state.tens}</p>
                      </div>
                    </div>
                    <div className='col-3 ChangeOutputContainer'>
                      <div className="ChangeOutputLabels">
                        <h1 className='changeLabels'>Fives</h1>
                        <p className='lead changeOutputs'>{this.state.fives}</p>
                      </div>
                    </div>
                    <div className='col-3 ChangeOutputContainer'>
                      <div className="ChangeOutputLabels">
                        <h1 className='changeLabels'>Ones</h1>
                        <p className='lead changeOutputs'>{this.state.ones}</p>
                      </div>
                    </div>
                  </div>

                  <div className='row change-output-row'>
                    <div className='col-3 form-group ChangeOutputContainer'>
                      <div className="ChangeOutputLabels">
                        <h1 className='changeLabels'>Quarters</h1>
                        <p className='lead changeOutputs'>{this.state.quarters}</p>
                      </div>
                    </div>
                    <div className='col-3 form-group ChangeOutputContainer'>
                      <div className="ChangeOutputLabels">
                        <h1 className='changeLabels'>Dimes</h1>
                        <p className='lead changeOutputs'>{this.state.dimes}</p>
                      </div>
                    </div>
                    <div className='col-3 form-group ChangeOutputContainer'>
                      <div className="ChangeOutputLabels">
                        <h1 className='changeLabels'>Nickels</h1>
                        <p className='lead changeOutputs'>{this.state.nickels}</p>
                      </div>
                    </div>
                    <div className='col-3 form-group ChangeOutputContainer'>
                      <div className="ChangeOutputLabels">
                        <h1 className='changeLabels'>Pennies</h1>
                        <p className='lead changeOutputs'>{this.state.pennies}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
{/* </div> */ }

