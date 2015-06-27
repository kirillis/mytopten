var ListItem = React.createClass({
  render: function() {
    return (
      <li className="ListItem-title">{ this.props.item.title }</li>
    );
  }
});
