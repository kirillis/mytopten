ReactListView.init = function(list) {
  var tempStore = {
    ListStore: new ReactListView.listStore({ list: list })
  };
  ReactListView.flux = new Fluxxor.Flux(tempStore, ReactListView.actions);
  ReactListView.flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
      console.log("[Dispatch]", type, payload);
    }
  });
}

window.loadListView = function(list) {
  ReactListView.init(list);
  React.render(
    <List flux={ ReactListView.flux } />,
    document.getElementById('js-react-listContainer')
  );
}
