var List = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ListStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    var listItems = flux.store("ListStore").getState().list.list_items;
    return {
      list: flux.store("ListStore").getState().list,
      itemsToSave: flux.store("ListStore").getState().itemsToSave,
    };
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
        <h2>{ this.state.list.title }</h2>
        <ol>
          { listItems }
        </ol>
        <SearchContainer />
      </div>
    );
  }
});
