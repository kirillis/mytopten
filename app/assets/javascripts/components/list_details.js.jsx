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

  handleQuillInput: function(text) {
    this.setState({
      hasChanged: true,
      description: text
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
      return <a onClick={ this.saveData } className="Button Button--withIcon"><i className="material-icons">save</i>Save</a>
    } else {
      return <span className="Button Button--withIcon Button--disabled"><i className="material-icons">save</i>Save</span>
    }
  },

  render: function() {
    var saveButton = this.getSaveButton();
    return (
      <div className="Form">

          <label htmlFor="title">List title</label>
          <input
            type="text"
            name="title"
            id="title"
            required="required"
            value={ this.state.title }
            onChange={ this.handleTitleChange }
          />

          <label htmlFor="description">Description</label>
          <QuillEditor 
            elementId='list-details'
            text={ this.props.description }
            handleInput={ this.handleQuillInput } />

          <input
            id="public"
            type="checkbox"
            checked={ this.state.public }
            onChange={ this.handlepublicChange }
          />
          <label htmlFor="public">Make this list public</label>

          <div>
            <div className="u-mt-1 u-d-inline-block">{ saveButton }</div>
          </div>

      </div>
    );
  }
});
