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
    return new Sortable(document.querySelector('.ListItems'), {
        sort: true,  // sorting inside list
        animation: 120,  // ms, animation speed moving items when sorting, `0` — without animation
        handle: ".Item-dragHandle",  // Drag handle selector within list items
        filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
        draggable: ".Item",  // Specifies which items inside the element should be sortable
        ghostClass: "Item--ghost",  // Class name for the drop placeholder
        chosenClass: "Item--chosen",  // Class name for the chosen item
        dataIdAttr: 'data-reactid',
        scroll: true, // or HTMLElement
        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
        scrollSpeed: 10, // px

        setData: function (dataTransfer, dragEl) {
          dataTransfer.setData('Text', dragEl.textContent);
        },

        // dragging started
        onStart: function (evt) {
          console.log('onStart', evt);
          evt.oldIndex;  // element index within parent
        },

        // dragging ended
        onEnd: function (evt) {
          console.log('onStart', evt);
          sortable.toArray();
          evt.oldIndex;  // element's old index within parent
          evt.newIndex;  // element's new index within parent
        },

        // Element is dropped into the list from another list
        onAdd: function (evt) {
          var itemEl = evt.item;  // dragged HTMLElement
          evt.from;  // previous list
          // + indexes from onEnd
        },

        // Changed sorting within list
        onUpdate: function (evt) {
          var itemEl = evt.item;  // dragged HTMLElement
          // + indexes from onEnd
        },

        // Event when you move an item in the list or between lists
        onMove: function (evt) {
          // Example: http://jsbin.com/tuyafe/1/edit?js,output
          evt.dragged; // dragged HTMLElement
          evt.draggedRect; // TextRectangle {left, top, right и bottom}
          evt.related; // HTMLElement on which have guided
          evt.relatedRect; // TextRectangle
          // return false; — for cancel
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

        <SearchContainer />
      </div>
    );
  }
});
