var List = React.createClass({
  render: function() {
    var listItems = this.props.items.map(function(item) {
      return <ListItem item={ item } key={ item.id } />;
    })
    return (
      <div className="List">
        <h4>{ this.props.title }</h4>
        <ol>
          { listItems }
        </ol>
      </div>
    );
  }
});
