var List = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ListStore")],

  getInitialState: function() {
    return {
      hasChanged: false
    };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      listDetails: flux.store("ListStore").getState().listDetails,
      listItems: flux.store("ListStore").getState().listItems,
      listTags: flux.store("ListStore").getState().listTags,
      itemsToSave: flux.store("ListStore").getState().itemsToSave,
    };
  },

  descriptionChange: function(event) {
    this.state.hasChanged = true;
    this.setState({ description: event.target.value });
  },

  handleItemChange: function(data) {
    // console.log('data', data);
    var newListItems = $.extend(this.state.listItems, {});
    for (var i = newListItems.length - 1; i >= 0; i--) {
      if(data.id === newListItems[i].id) {
        newListItems[i].description = data.description;
      }
    }

    this.setState({
      listItems: newListItems,
      hasChanged: true
    });
  },

  saveData: function() {
    console.log('saveData');
    this.setState({
      hasChanged: false
    });
  },

  render: function() {
    var saveButton = this.state.hasChanged ? <button className="c-button" onClick={ this.saveData }>Save</button> : '';
    var props = this.props;
    var state = this.state;
    var _this = this;
    var listItems = this.state.listItems.map(function(item) {
      return <ListItem
              data = { item }
              key = { item.id }
              onChange = { _this.handleItemChange }
            />;
    });
    return (
      <div className="c-listContainer">
        <ListDetails
          title = { this.state.listDetails.title }
          description = { this.state.listDetails.description }
          author = { this.state.listDetails.user }
          public = { this.state.listDetails.public }
        />

        { saveButton }
        <Tags tags = { this.state.listTags } listId = { this.state.listDetails.id } />
        <ol className='c-listItemsContainer'>
          { listItems }
        </ol>
        <SearchContainer />
      </div>
    );
  }
});
