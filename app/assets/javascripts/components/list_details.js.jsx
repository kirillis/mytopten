var ListDetails = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      title: this.props.title,
      description: this.props.description,
      isPublic: this.props.public,
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

  handleIsPublicChange: function(event) {
    this.setState({
      hasChanged: true,
      isPublic: !this.state.isPublic
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
          type="text"
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
        <input
          name="public"
          type="checkbox"
          checked={ this.state.isPublic }
          onChange={ this.handleIsPublicChange }
        />
        <label htmlFor="public">public list</label>
        <br />
        {saveButton}
      </div>
    );
  }
});
