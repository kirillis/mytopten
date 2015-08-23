var ListView = React.createClass({
  render: function() {
    return (
      <div className='ListView'>
        <List listPath={ this.props.listPath } />
        <SearchContainer />
      </div>
    );
  }
});