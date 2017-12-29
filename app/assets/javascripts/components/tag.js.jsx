var Tag = React.createClass({

  getInitialState: function () {
    return {
      isHidden: false
    };
  },

  handleAddClick: function (event) {
    this.setState({
      isHidden: true
    });

    this.props.addClickHandler(event, this.props.data);
  },

  tagClickHandler: function (event) {
    this.props.tagClickHandler(event, this.props.data);
  },

  handleRemoveClick: function (event) {
    this.setState({
      isHidden: true
    });
    this.props.removeClickHandler(event, this.props.data);
  },

  renderTag: function () {
    var classes = classNames(
      'Tag u-p-05 u-bg-gamma u-color-white u-mb-2 u-mr-05', {
        'Tag--withButton': !this.props.isSuggestion,
        'Tag--suggestion': this.props.isSuggestion,
        'Tag--isHidden': this.state.isHidden,
      });

    if (this.props.isSuggestion) {
      return (
        <li className={classes} onClick={this.handleAddClick}>
          {this.props.data.name} <span className="u-t-muted">({this.props.data.taggings_count})</span>
        </li>
      );
    } else if (this.props.type === 'add') {
      return (
        <div className='Tag Tag--add u-ff-ptsans u-c-white u-mb-1 u-mr-05' onClick={this.tagClickHandler}>
          <div className="Tag__prefix u-d-inline-block u-bg-blue-light u-px-05 u-py-04 u-fw-700">+</div>
          <div className="Tag__content u-d-inline-block u-bg-blue u-pl-05 u-px-1 u-py-04">{this.props.data.name} ({this.props.data.taggings_count})</div>
        </div>
      );
    } else if (this.props.type === 'remove') {
      return (
        <div className='Tag Tag--add u-ff-ptsans u-c-white u-mb-1 u-mr-05' onClick={this.tagClickHandler}>
          <div className="Tag__prefix u-d-inline-block u-bg-blue-light u-px-05 u-py-04 u-fw-700">&ndash;</div>
          <div className="Tag__content u-d-inline-block u-bg-blue u-pl-05 u-px-1 u-py-04">{this.props.data.name}</div>
        </div>
      );
    } else {
      return (
        <li className="Tag-wrapper">
          <a href={"/tags/" + this.props.data.name}>
            <span className={classes}>
              {this.props.data.name}
            </span>
          </a>
          <i className="Tag-removeButton material-icons" onClick={this.handleRemoveClick}>remove_circle</i>
        </li>
      );
    }
  },

  render: function () {
    return this.renderTag();
  }
});
