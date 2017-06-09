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
      'Tag u-p-05 u-bg-green u-color-white u-mb-05 u-mr-05', {
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
        <li>
          <a href={ "/tags/" + this.props.data.name }>
            <span className={ classes }>
              { this.props.data.name }
            </span>
          </a>
          <span onClick={ this.handleRemoveClick }>X</span>
        </li>
      );
    }
  },

  render: function() {
    return this.renderTag();
  }
});
