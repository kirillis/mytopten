var ListDetails = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      title: this.props.title,
      description: this.props.description,
      hasChanged: false
    };
  },

  handleTitleChange: function(event) {
    this.setState({
      hasChanged: true,
      title: event.target.value
    });
  },

  handleDescriptionChange: function(event) {
    this.setState({
      hasChanged: true,
      description: event.target.value
    });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      title: nextProps.title,
      description: nextProps.description,
    });
  },

  saveData: function() {
    this.getFlux().actions.list.update({
      oldData: this.props,
      newData: this.state
    });
    this.setState({hasChanged: false});
  },

  render: function() {
    var saveButton = this.state.hasChanged ? <button className="c-button" onClick={ this.saveData }>Save</button> : '';
    return (
      <div className='c-listDetails'>
        <input
          value={ this.state.title }
          onChange={ this.handleTitleChange }
        />
        <br />
        <textarea
          rows="5"
          cols="100"
          value={ this.state.description }
          onChange={ this.handleDescriptionChange }
        />
        <br />
        {saveButton}
      </div>
    );
  }
});
