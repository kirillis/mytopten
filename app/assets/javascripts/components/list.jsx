var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

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

  fetchListItems: function() {
    //   var _this = this;
    //   $.getJSON(
    //     this.props.listPath,
    //     function(data) {
    //       if(_this.isMounted()) {
    //         _this.setState({
    //           listItems: data.list_items,
    //           title: data.title
    //         });
    //       }
    //     }
    //   )
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
      </div>
    );
  }
});

ReactListView.init = function(list) {
  var tempStore = {
    ListStore: new ReactListView.store({
      list: list
    })
  };
  ReactListView.flux = new Fluxxor.Flux(tempStore, ReactListView.actions);
  ReactListView.flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
      console.log("[Dispatch]", type, payload);
    }
  });

  console.log(this);
}

window.loadListView = function(list) {
  ReactListView.init(list);
  React.render(
    <List flux={ ReactListView.flux } />,
    document.getElementById('js-react-listContainer')
  );
}
