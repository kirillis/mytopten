var Tag = React.createClass({

  getInitialState: function() {
    return {
      isHidden: false
    };
  },

  handleAddClick: function(event) {
    this.setState({
      isHidden: true
    });

    this.props.addClickHandler(event, this.props.data);
  },

  handleRemoveClick: function(event) {
    this.props.removeClickHandler(event, this.props.data);
  },

  renderTag: function() {
    if(this.props.isSuggestion) {

      var classes = classNames({
      'Tag': true,
      'Tag--suggestion': true,
      'is-hidden': this.state.isHidden
      });

      return(
        <li className={ classes } onClick={ this.handleAddClick }>
          { this.props.data.name }
        </li>
      );
    } else {
      return(
        <li className="Tag">
          <a href={ "/tags/" + this.props.data.name }>{ this.props.data.name }</a>
          <span className="Tag-deleteButton" onClick={ this.handleRemoveClick }>X</span>
        </li>
      );
    }
  },

  render: function() {
    return this.renderTag();
  }
});
