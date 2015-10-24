var List = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ListStore")],

  getInitialState: function() {
    return {
      hasChanged: false
    };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    var listItems = flux.store("ListStore").getState().list.list_items;
    return {
      list: flux.store("ListStore").getState().list,
      itemsToSave: flux.store("ListStore").getState().itemsToSave,
    };
  },

  descriptionChange: function(event) {
    this.state.hasChanged = true;
    this.setState({ description: event.target.value });
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var listItems = this.state.list.list_items.map(function(item) {
      return <ListItem
              data = { item }
              key = { item.id }
              flux = { props.flux }
            />;
    });
    return (
      <div className="c-listContainer">
        <ListDetails
         title={this.state.list.title}
         description={this.state.list.description}
         public={this.state.list.public}
       />
        <h3 className='c-listAuthor'>
          <a
          className='c-listAuthor-link'
            href={'/' + this.state.list.user.name }>by { this.state.list.user.name }
          </a>
        </h3>
        <ol className='c-listItemsContainer'>
          { listItems }
        </ol>
        <SearchContainer />
      </div>
    );
  }
});
