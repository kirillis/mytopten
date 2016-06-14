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
    this.setState({
      isHidden: true
    });
    this.props.removeClickHandler(event, this.props.data);
  },

  renderTag: function() {
    var classes = classNames(
      'Tag', {
      'Tag--suggestion': this.props.isSuggestion,
      'is-hidden': this.state.isHidden,
    });

    if(this.props.isSuggestion) {
      return(
        <li className={ classes } onClick={ this.handleAddClick }>
          { this.props.data.name }
        </li>
      );
    } else {
      return(
        <li className={ classes }>
          <a href={ "/tags/" + this.props.data.name }>
            { this.props.data.name }
          </a>
          <span className="Tag-deleteButton" onClick={ this.handleRemoveClick }>delete</span>
        </li>
      );
    }
  },

  render: function() {
    return this.renderTag();
  }
});
