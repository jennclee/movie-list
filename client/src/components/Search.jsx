import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      searchText: event.target.value
    });
    this.props.clear();
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.search(this.state.searchText);
  }

  render() {
    return (
      <div>
        <form>
          <input onChange={this.handleOnChange} type="text" />
          <button onClick={this.handleOnSubmit} type="submit" className="search">Search</button>
        </form>
      </div>
    );
  }
}
