var ListDetails = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      title: this.props.title,
      description: this.props.description,
      public: this.props.public,
      hasChanged: false,
      timeoutBeforeSave: false
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

    if(this.state.timeoutBeforeSave) {
      window.clearTimeout(this.state.timeoutBeforeSave);
      this.setState({ timeoutBeforeSave: false});
    }

    let timeout = window.setTimeout( () => {
      this.saveData();
    }, 1000);

    this.setState({ timeoutBeforeSave: timeout})
  },

  handleDescriptionChange: function(event) {
    this.setState({
      hasChanged: true,
      description: event.target.value
    });
  },

  handlePublicChange: function(event) {
    this.setState({
      hasChanged: true,
      public: !this.state.public
    }, this.saveData);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      title: nextProps.title,
      description: nextProps.description,
    });
  },

  componentDidMount: function() {
    var keyups = Rx.Observable.fromEvent(this.refs.titleInput, 'keyup')
      .pluck('target', 'value')
      .debounce(1000)
      .subscribe(
        (data) => {
          this.saveData();
        }
      );
  },

  saveData: function() {
    this.getFlux().actions.list.update({
      oldData: this.props,
      newData: this.state
    });

    this.setState({hasChanged: false});
  },

  render: function() {
    return (
      <div className="Form">

          <label htmlFor="title">List title</label>
          <input
            ref="titleInput"
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
            onChange={ this.handlePublicChange }
          />
          <label htmlFor="public">Make this list public</label>

      </div>
    );
  }
});
