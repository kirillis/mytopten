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
      'Tag u-p-05 u-bg-gamma u-color-white u-mb-05 u-mr-05', {
      'Tag--withButton': !this.props.isSuggestion,
      'Tag--suggestion': this.props.isSuggestion,
      'Tag--isHidden': this.state.isHidden,
    });

    if(this.props.isSuggestion) {
      return(
        <li className={ classes } onClick={ this.handleAddClick }>
          { this.props.data.name } <span className="u-t-muted">({ this.props.data.taggings_count })</span>
        </li>
      );
    } else {
      return(
        <li className="Tag-wrapper">
          <a href={ "/tags/" + this.props.data.name }>
            <span className={ classes }>
              { this.props.data.name }
            </span>
          </a>
          <i className="Tag-removeButton material-icons" onClick={ this.handleRemoveClick }>remove_circle</i>
        </li>
      );
    }
  },

  render: function() {
    return this.renderTag();
  }
});
