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
        handle: ".ListItemCondensed-dragHandle",
        draggable: ".ListItem-wrapper",
        ghostClass: "ListItem-wrapper--ghost",
        chosenClass: "ListItem-wrapper--chosen",
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

  handleTitleEntered: function(title) {
    console.log('list::handleTitleEntered():', title);
    this.setState({
      titleEntered: title,
    });
  },

  componentDidMount: function() {
    this.sortableInstance = this.getSortableInstance();
    window.sortablePlugin = this.sortableInstance;
  },

  getInitialState: function() {
    return {
      titleEntered: '',
    }
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
      <div>
        <div className="u-bg-beta">
          <div className="container u-py-3 u-mb-3">

            <div className="Grid">
              <div className="Grid-cell 1-of-4">
                <h2>Edit your list here</h2>
                <a href={ "/" + this.state.listDetails.user.name + "/lists/" + this.state.listDetails.id } className="Button Button--withIcon">
                  <i className="material-icons">view_headline</i>
                  View
                </a>
                <a className="Button Button--withIcon" data-method="delete" href={ "/" + this.state.listDetails.user.name + "/lists/" + this.state.listDetails.id } rel="nofollow">
                  <i className="material-icons">delete</i>
                  Delete
                </a>
              </div>

              <div className="Grid-cell 1-of-4 u-t-align-center">
                <p className="u-t-uppercase u-mb-0">Created</p>
                <p className="u-fw-700 h2 u-mb-0">{ this.state.listDetails.created_at } ago</p>
              </div>

              <div className="Grid-cell 1-of-4 u-t-align-center">
                <p className="u-t-uppercase u-mb-0">Updated</p>
                <p className="u-fw-700 h2 u-mb-0">{ this.state.listDetails.updated_at } ago</p>
              </div>

              <div className="Grid-cell 1-of-4 u-t-align-center">
                <p className="u-t-uppercase u-mb-0">Likes</p>
                <p className="u-fw-700 h2 u-mb-0">{ this.state.listDetails.cached_votes_total }</p>
              </div>

            </div>

          </div>
        </div>

        <div className="container">

          <div className="Grid">
            <div className="Grid-cell 2-of-3--desk">

              <ListDetails
                title = { this.state.listDetails.title }
                description = { this.state.listDetails.description }
                public = { this.state.listDetails.public }
                listId = { this.state.listDetails.id }
              />
            </div>

            <div className="Grid-cell 1-of-3--desk">
              <Tags
                tags = { this.state.listTags }
                listId = { this.state.listDetails.id }
              />
            </div>
          </div>

          <div className="u-mt-3">
              {listItems.length === 0 ?
                (
                  <div>
                    <h2 className="u-mt-4">No items on list, yet</h2>
                    <p>Use the form below to add items to your list.</p>
                  </div>
                ) : (
                  <h2 className="u-mt-4 u-mb-3">
                    These <strong>{ this.state.listItems.length }</strong> items are on your list:
                  </h2>
                )
              }
            <div className="ListItems">
              { listItems }
            </div>
          </div>

          <div className="Grid u-mt-3">
            <div className="Grid-cell 2-of-3--desk u-mb-2">
              <ListItemAdd
                onTitleEntered={ this.handleTitleEntered }
                listId = { this.state.listDetails.id }
              />
            </div>

            <div className="Grid-cell 1-of-3--desk">
              <SearchContainer searchQuery={ this.state.titleEntered }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
