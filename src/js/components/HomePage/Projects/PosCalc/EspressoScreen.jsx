import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from './PosCalcActions';


class EspressoScreen extends Component {
  constructor(props) {
    super(props);
    this.addDrink = this.addDrink.bind(this);
  }

  addDrink(drink) {
    const { dispatch, currentOrder, drinkSize } = this.props;
    dispatch(addItem(currentOrder, drink, 'brewed', drinkSize));
  }

  render() {
    const { espresso, latte, mochas } = this.props;
    const esp = espresso ? espresso : [];
    const lat = latte ? latte : [];
    const moc = mochas ? mochas : [];
    return (
      <div className="espresso-screen">
        <div className="espresso-screen-row">
          {esp.map((espr, i) => {
            let cName;
            if (espr.color == 'empty') {
              cName = 'espresso-screen-row--empty'
            } else {
              cName = `espresso-screen-row-btn espresso-screen-row-btn--${espr.color}`
            }
            return (
              <button className={cName}
                key={i}
                onClick={() => this.addDrink(espr)}>
                {espr.name}
              </button>
            )
          })}
          {lat.map((latt, i) => {
            let cName;
            if (latt.color == 'empty') {
              cName = 'espresso-screen-row--empty'
            } else {
              cName = `espresso-screen-row-btn espresso-screen-row-btn--${latt.color}`
            }
            return (
              <button className={cName}
                key={i}
                onClick={() => this.addDrink(latt)}>
                {latt.name}
              </button>
            )
          })}
          {moc.map((moch, i) => {
            let cName;
            if (moch.color == 'empty') {
              cName = 'espresso-screen-row--empty'
            } else {
              cName = `espresso-screen-row-btn espresso-screen-row-btn--${moch.color}`
            }
            return (
              <button className={cName}
                key={i}
                onClick={() => this.addDrink(moch)}>
                {moch.name}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    espresso: state.home.posCalc.espresso,
    latte: state.home.posCalc.latte,
    mochas: state.home.posCalc.mochas
  }
}

export default connect(mapStateToProps)(EspressoScreen);