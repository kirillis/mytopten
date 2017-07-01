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

  getInitialState: function() {
    return {
      title: this.props.data.title,
      rank: this.props.data.rank,
      description: this.props.data.description ? this.props.data.description : '',
      hasChanged: false,
    };
  },

  render: function() {
    var saveButton = this.state.hasChanged ? <button onClick={ this.saveData }>Save</button> : '';
    return (
      <div className="ListItem Form u-mb-4" data-rank={ this.props.data.rank } data-id={ this.props.data.id }>
        <div className="Grid">

          <div className="Grid-cell 1-of-4">
            <div className="ListItem-dragHandle"><i className="material-icons">drag_handle</i></div>
            <div className="ListItem-mediaContainer">
              <a href={ this.props.data.image_large } className="">
                <img src={ this.props.data.image_thumb } className="" />
              </a>
            </div>
          </div>

          <div className="Grid-cell 1-of-4">
            Title:
            <textarea
              rows="4"
              value={ this.state.title }
              onChange={ this.titleChange }
            />
          </div>

          <div className="Grid-cell 1-of-4">
            Description:
            <textarea
              rows="1"
              value={ this.state.description }
              onChange={ this.descriptionChange }
            />
          </div>

        </div>
        <button onClick={ this.deleteEntry }>Delete</button>
        { saveButton }
      </div>
    );
  }
});
