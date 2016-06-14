var List = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ListStore")],

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
      listItems: newListItems
    });
  },

  getSortableInstance: function() {
    var self = this;
    return new Sortable(document.querySelector('.ListItems'), {
        animation: 120,
        handle: ".Item-dragHandle",
        draggable: ".Item",
        ghostClass: "Item--ghost",
        chosenClass: "Item--chosen",
        dataIdAttr: 'data-rank',
        scroll: true,
        scrollSensitivity: 30,
        scrollSpeed: 10,

        onEnd: function (evt) {
          listItemId = $(evt.item).data('id');
          newRank = evt.newIndex;
          $.ajax({
            method: 'PUT',
            url:  '/list_items/' + listItemId + '/' + newRank
          });
        }
    });
  },

  componentDidMount: function() {
    this.sortableInstance = this.getSortableInstance();
    window.sortablePlugin = this.sortableInstance;
    console.log('componentDidMount');
  },

  render: function() {
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
      <div className="List">
        <div className="row">

          <div className="col s12 m6">
            <ListDetails
              title = { this.state.listDetails.title }
              description = { this.state.listDetails.description }
              author = { this.state.listDetails.user }
              public = { this.state.listDetails.public }
            />
          </div>

          <div className="col s12 m5 offset-m1">
            <Tags
              tags = { this.state.listTags }
              listId = { this.state.listDetails.id }
            />
          </div>
        </div>

        <div className="divider"></div>
        <div className="row">
          <div className="col s12">
            <div className="ListItems">
              { listItems }
            </div>
          </div>
        </div>
        <div className="divider"></div>

        <ListItemAdd />
        <SearchContainer />
      </div>
    );
  }
});
