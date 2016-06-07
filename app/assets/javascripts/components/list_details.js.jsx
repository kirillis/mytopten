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

  componentDidMount: function() {
    Materialize.updateTextFields();
  },

  saveData: function() {
    this.getFlux().actions.list.update({
      oldData: this.props,
      newData: this.state
    });
    this.setState({hasChanged: false});
  },

  getSaveButton: function() {
    if(this.state.hasChanged) {
      return <a className="waves-effect waves-light btn" onClick={ this.saveData }><i className="material-icons left">cloud</i>Save</a>
    } else {
      return <a className="waves-effect waves-light btn disabled"><i className="material-icons left">cloud</i>Save</a>
    }
  },

  render: function() {
    var saveButton = this.getSaveButton();
    return (
      <div className='ListDetails'>
        <div className="row">
          <div className="col s12">
            <p className="flow-text">
              List author <a className='ListDetails-authorName' href = { '/' + this.props.author.name }>{ this.props.author.name }</a>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="title">List title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="validate"
              required="required"
              value={ this.state.title }
              onChange={ this.handleTitleChange }
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="description"
              className="materialize-textarea validate"
              required="required"
              value={ this.state.description }
              onChange={ this.handleDescriptionChange }
            >
            </textarea>
            <label htmlFor="description">Description</label>
          </div>
        </div>

        <p>
          <input
            id="public"
            className="filled-in"
            type="checkbox"
            checked={ this.state.public }
            onChange={ this.handlepublicChange }
          />
          <label htmlFor="public">Make this list public</label>
        </p>

        { saveButton }
      </div>
    );
  }
});
