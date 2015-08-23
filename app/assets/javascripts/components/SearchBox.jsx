var SearchBox = React.createClass({
  handleKeyDown: function(event) {
    if(event.key == 'Enter') {
      this.props.onSendQuery();
    }
  },

  handleChange: function() {
      this.props.onUserInput(
          this.refs.searchQueryInput.getDOMNode().value
      );
  },

  render: function() {
    return (
      <div className="SearchBox">
        <h3>AmazonSearch</h3>
        <input
          placeholder="Search..."
          ref="searchQueryInput"
          value={ this.props.searchQuery }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
        />
      </div>
    );
  }
});