var ListDetails = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      title: this.props.title,
      description: this.props.description,
      public: this.props.public,
      hasChanged: false,
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

  handlepublicChange: function(event) {
    this.setState({
      hasChanged: true,
      public: !this.state.public
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
          checked={ this.state.public }
          onChange={ this.handlepublicChange }
        />
        <label htmlFor="public">public list</label>
        <br />
        { saveButton }
        <h3 className='c-listAuthor'>
          <a
          className='c-listAuthor-link'
            href = { '/' + this.props.author.name }>by { this.props.author.name }
          </a>
        </h3>
      </div>
    );
  }
});
