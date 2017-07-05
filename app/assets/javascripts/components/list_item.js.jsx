var ListItem = React.createClass({
  mixins: [FluxMixin],

  rankChange: function(event) {
    this.setState({
      rank: event.target.value,
      hasChanged: true
    });
  },

  titleChange: function(event) {
    this.setState({
      title: event.target.value,
      hasChanged: true
    });
  },

  descriptionChange: function(event) {
    var data = {
      description: event.target.value,
      id: this.props.data.id
    };

    this.props.onChange(data);
    this.setState({
      description: event.target.value,
      hasChanged: true
    });
  },

  saveData: function() {
    var itemData = this.props.data;
    var newItemData = $.extend({}, itemData);
    newItemData.title = this.state.title;
    newItemData.description = this.state.description;
    newItemData.rank = this.state.rank;
    this.getFlux().actions.listItem.update(itemData, newItemData);
    this.setState({hasChanged: false});
  },

  deleteEntry: function() {
    this.getFlux().actions.listItem.delete(this.props.data.id);
  },

  toggleEditMode: function() {
    this.setState({ isEditMode: !this.state.isEditMode })
  },

  getInitialState: function() {
    return {
      title: this.props.data.title,
      rank: this.props.data.rank,
      description: this.props.data.description ? this.props.data.description : '',
      hasChanged: false,
      isEditMode: false
    };
  },

  render: function() {
    var saveButton = this.state.hasChanged ? <button className="Button Button--withIcon" onClick={ this.saveData }><i className="material-icons">save</i>Save</button> : '';

    var itemClasses = classNames(
      'ListItem-wrapper u-mb-2', {
        'ListItem-wrapper--condensed': !this.state.isEditMode
      }
    );

    return (
      <div className={ itemClasses } data-id={ this.props.data.id }  data-rank={ this.props.data.rank }>
        <div className="ListItem u-p-2">

          <div className="Grid Form">
            <div className="Grid-cell 1-of-4--lap-and-up">
              <div className="ListItem-mediaContainer u-t-align-center">
                <a href={ this.props.data.image_large }>
                  <img src={ this.props.data.image_large } className="ListItem-image" />
                </a>
              </div>
            </div>

            <div className="Grid-cell 3-of-4--lap-and-up">
              <div className="Grid">
                <div className="Grid-cell 1-of-2--desk">
                  <label>Title</label>
                  <textarea
                    rows="4"
                    value={ this.state.title }
                    onChange={ this.titleChange }
                  />
                </div>

                <div className="Grid-cell 1-of-2--desk">
                  <label>Description</label>
                  <textarea
                    rows="4"
                    value={ this.state.description }
                    onChange={ this.descriptionChange }
                  />
                </div>
              </div>
            </div>

          </div>
          <div className="u-t-align-right">
            { saveButton }
            <button className="Button Button--withIcon" onClick={ this.deleteEntry }>
              <i className="material-icons">delete</i>
              Delete
            </button>
            <button className="Button Button--withIcon" onClick={ this.toggleEditMode }>
              <i className="material-icons">edit</i>
              Close Edit
            </button>
          </div>
        </div>

        <div className="ListItemCondensed u-p-1">
          <button className="ListItemCondensed-dragHandle"><i className="material-icons">drag_handle</i></button>
          <div className="ListItemCondensed-media u-mr-2">
            <img src={ this.props.data.image_large } className="ListItem-image" />
          </div>
          <div className="ListItemCondensed-copy u-pr-4">
            <p>{ this.state.title }</p>
            <p className="u-t-muted">{ this.state.description }</p>
          </div>

          <div className="ListItemCondensed-button">
            <button className="Button Button--withIcon" onClick={ this.toggleEditMode }>
              <i className="material-icons">edit</i>
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
});
