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
      description: this.props.data.description,
      hasChanged: false
    };
  },

  render: function() {
    var saveButton = this.state.hasChanged ? <button onClick={ this.saveData }>Save</button> : '';
    return (
      <div className="Item" data-rank={ this.props.data.rank } data-id={ this.props.data.id }>

        <div className="Item-dragHandle"></div>
        <div className="Item-mediaContainer">
          <a href={ this.props.data.link } className="">
            <img src={ this.props.data.image_url } className="" />
          </a>
        </div>
        <div className="Item-textContainer">
          <textarea
            rows="4"
            defaultValue={ this.props.data.title }
            value={ this.state.title }
            onChange={ this.titleChange }
          />
          <textarea
            rows="1"
            defaultValue={ this.props.data.description }
            value={ this.state.description }
            onChange={ this.descriptionChange }
          />
          <button onClick={ this.deleteEntry }>Delete</button>
          { saveButton }
        </div>
      </div>
    );
  }
});
