var ListItem = React.createClass({
  inputChange: function(event) {
    this.state.hasChanged = true;
    this.setState({ value: event.target.value });
  },

  saveData: function() {
    if(this.state.hasChanged) {
      this.state.item.title = this.state.value;
      var stringData = JSON.stringify(this.state.item);
      var path = '/list_items/' + this.state.item.id;
      console.log(path);
      $.ajax({
        url: path,
        method: 'put',
        data: stringData,
        dataType: 'json',
        contentType: 'application/json',
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('error', errorThrown);
        },
        success: function(data, textStatus, jqXHR) {
          console.log('success', data);
          this.setState({ hasChanged: false });
        }.bind(this)
      });
    }
  },

  getInitialState: function() {
    return {
      item: this.props.data,
      hasChanged: false
    }
  },

  render: function() {
    var saveButton = this.state.hasChanged ? <button onClick={ this.saveData } >Save</button> : '';
    return (
      <li className="ListItem-title">
        <input defaultValue={ this.props.data.title } value={ this.state.value } onChange={ this.inputChange } data-id={ this.state.item.id } />
        { saveButton }
      </li>
    );
  }
});
