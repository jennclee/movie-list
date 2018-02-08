import React from 'react';

export default class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addText: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      addText: event.target.value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.add(this.state.addText);
  }

  render() {
    return (
      <div>
        <form>
          <input onChange={this.handleOnChange} type="text" />
          <button onClick={this.handleOnSubmit} type="submit" className="add">Add Movie</button>
        </form>
      </div>
    );
  }
}
