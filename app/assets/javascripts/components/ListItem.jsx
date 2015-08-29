var ListItem = React.createClass({
  mixins: [FluxMixin],

  inputChange: function(event) {
    this.state.hasChanged = true;
    this.setState({ value: event.target.value });
  },

  saveData: function() {
    // this.getFlux().actions.updateIngredient(this.props.ingredient, $(this.refs.ingredient.getDOMNode()).val());
    this.getFlux().actions.updateItem(this.props.data, this.state.value);
    this.setState({ hasChanged: false, isUpdated: true });
  },

  getInitialState: function() {
    return {
      value: this.props.data.title,
      item: this.props.data,
      hasChanged: false,
      isUpdated: false
    }
  },

  render: function() {
    var saveButton = this.state.hasChanged ? <button onClick={ this.saveData }>Save</button> : '';
    return (
      <li className="ListItem-title">
        <h4>{ this.props.title }</h4>
        <input
          defaultValue={ this.props.data.title }
          value={ this.state.value }
          onChange={ this.inputChange }
          data-id={ this.state.item.id }
        />
        { saveButton }
      </li>
    );
  }
});
