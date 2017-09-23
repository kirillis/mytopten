var ListItem = React.createClass({
  mixins: [FluxMixin],

  rankChange: function (event) {
    this.setState({
      rank: event.target.value,
      hasChanged: true
    });
  },

  titleChange: function (event) {
    this.setState({
      title: event.target.value,
      hasChanged: true
    });
  },

  descriptionChange: function (text) {
    var data = {
      description: text,
      id: this.props.data.id
    };

    this.props.onChange(data);
    this.setState({
      description: text,
      hasChanged: true
    });
  },

  handleImagePicked: function (image_thumb_url, image_large_url) {
    this.setState({
      hasChanged: true,
      image_thumb_url: image_thumb_url,
      image_large_url: image_large_url,
    });
  },

  deleteEntry: function () {
    this.getFlux().actions.listItem.delete(this.props.data.id);
  },

  toggleEditMode: function () {
    this.setState({
      isEditMode: !this.state.isEditMode,
    });
  },

  saveAndClose: function () {
    var itemData = this.props.data;
    var newItemData = $.extend({}, itemData);
    newItemData.title = this.state.title;
    newItemData.description = this.state.description;
    newItemData.rank = this.state.rank;
    this.getFlux().actions.listItem.update(itemData, newItemData);
    this.setState({
      isEditMode: !this.state.isEditMode,
      hasChanged: false
    });
  },

  getInitialState: function () {
    return {
      title: this.props.data.title,
      rank: this.props.data.rank,
      description: this.props.data.description ? this.props.data.description : '',
      image_thumb_url: this.props.data.image_thumb_url,
      image_large_url: this.props.data.image_large_url,
      hasChanged: false,
      isEditMode: false
    };
  },

  render: function () {
    var saveButton = this.state.hasChanged ? 
      <button className="Button Button--withIcon" onClick={this.saveAndClose}><i className="material-icons">save</i>Save</button> : 
      <button className="Button Button--withIcon" onClick={this.toggleEditMode}><i className="material-icons">close</i>Close</button>;

    var itemClasses = classNames(
      'ListItem-wrapper u-mb-2', {
        'ListItem-wrapper--condensed': !this.state.isEditMode
      }
    );

    return (
      <div className={itemClasses} data-id={this.props.data.id} data-rank={this.props.data.rank}>
        <div className="ListItem u-p-2">

          <div className="Grid Form">
            <div className="Grid-cell 1-of-4--lap-and-up">
              <div className="ListItem-mediaContainer u-t-align-center">
                <a href={this.state.image_large_url}>
                  <img src={this.state.image_thumb_url} className="ListItem-image" />
                </a>
                <ImageSearch onImagePicked={this.handleImagePicked} />
              </div>
            </div>

            <div className="Grid-cell 3-of-4--lap-and-up u-mb-2">
              <div className="Grid">
                <div className="Grid-cell">
                  <label>Title</label>
                  <input
                    type="text"
                    value={this.state.title}
                    onChange={this.titleChange}
                  />

                  <label>Description</label>
                  <QuillEditor
                    elementId={'list-details-edit-' + this.props.data.id}
                    text={this.state.description}
                    handleInput={this.descriptionChange} />
                </div>
              </div>
            </div>

          </div>
          <div className="u-t-align-right">
            <button className="Button Button--withIcon" onClick={this.deleteEntry}>
              <i className="material-icons">delete</i>
              Delete
            </button>
            {saveButton}
          </div>
        </div>

        <div className="ListItemCondensed u-p-1">
          <button className="ListItemCondensed-dragHandle"><i className="material-icons">drag_handle</i></button>
          <div className="ListItemCondensed-media u-mr-2">
            <a href={this.state.image_large_url}>
              <img src={this.state.image_thumb_url} className="ListItem-image" />
            </a>
          </div>
          <div className="ListItemCondensed-copy u-pr-4">
            <h3 className="u-fw-100">{this.state.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: this.state.description }}></p>
          </div>

          <div className="ListItemCondensed-button">
            <button className="Button Button--withIcon" onClick={this.toggleEditMode}>
              <i className="material-icons">edit</i>
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
});
