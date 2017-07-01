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
      <div>
        <div className="Grid Form u-mt-4">
          <div className="Grid-cell 1-of-4--desk u-t-align-right">
          </div>
          <div className="Grid-cell 3-of-4--desk">
            <h2>{ this.props.title }</h2>
            <p>
              List author <a href = { '/' + this.props.author.name }>{ this.props.author.name }</a>
            </p>
          </div>

          <div className="Grid-cell 1-of-4--desk u-t-align-right">
            <label htmlFor="title">List title</label>
          </div>

          <div className="Grid-cell 3-of-4--desk">
            <input
              type="text"
              name="title"
              id="title"
              required="required"
              value={ this.state.title }
              onChange={ this.handleTitleChange }
            />
          </div>

          <div className="Grid-cell 1-of-4--desk u-t-align-right">
            <label htmlFor="description">Description</label>
          </div>
          <div className="Grid-cell 3-of-4--desk">
            <textarea
              rows="20"
              cols="100"
              id="description"
              className="materialize-textarea validate"
              required="required"
              value={ this.state.description }
              onChange={ this.handleDescriptionChange }
            >
            </textarea>
          </div>

          <div className="Grid-cell 1-of-4--desk">
          </div>
          <div className="Grid-cell 3-of-4--desk">
            <input
              id="public"
              type="checkbox"
              checked={ this.state.public }
              onChange={ this.handlepublicChange }
            />
            <label htmlFor="public">Make this list public</label>
          </div>

          <div className="Grid-cell 1-of-4--desk"></div>
          <div className="Grid-cell 3-of-4--desk">
            <div className="u-mt-1">{ saveButton }</div>
          </div>
        </div>
      </div>
    );
  }
});
