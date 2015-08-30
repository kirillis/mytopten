var List = React.createClass({
  /* Update this component when the Fluxxor store is updated */
  mixins: [FluxMixin, StoreWatchMixin("ListStore")],

  /* Get the ingredients list from the store */
  getStateFromFlux: function() {
    var flux = this.getFlux();
    var listItems = flux.store("ListStore").getState().list.list_items;
    return {
      list: flux.store("ListStore").getState().list
    };
  },

  render: function() {
    var props = this.props;
    var listItems = this.state.list.list_items.map(function(item) {
      return <ListItem
              title={ item.title }
              data={ item }
              key={ item.id }
              flux={ props.flux }
            />;
    })
    return (
      <div className="List">
        <h2>{ this.state.list.title }</h2>
        <ol>
          { listItems }
        </ol>
        <SearchContainer />
      </div>
    );
  }
});
