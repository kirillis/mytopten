var ListItem = React.createClass({
  mixins: [FluxMixin],

  inputChange: function(event) {
    this.state.hasChanged = true;
    this.setState({ value: event.target.value });
  },

  saveData: function() {
    // this.getFlux().actions.updateIngredient(this.props.ingredient, $(this.refs.ingredient.getDOMNode()).val());
    this.getFlux().actions.updateItem(this.props.data, this.state.value);
  },

  getInitialState: function() {
    return {
      value: this.props.data.title,
      item: this.props.data,
      hasChanged: false,
    }
  },

  render: function() {
    var classes = classNames({
      'c-listItem': true,
      'is-saving': this.props.isSaving,
    });
    // // same final string, but much cleaner
    // return <div className={classes}>Great, I'll be there.</div>;
    var saveButton = this.state.hasChanged ? <button className="c-button" onClick={ this.saveData }>Save</button> : '';
    return (
      <li className={ classes }>
        <p className="c-listItem__title">{ this.props.data.title }</p>
        <a href={ this.props.data.link } className="c-listItem__link">link</a>
        <img src={ this.props.data.image_url } className="c-listItem__link" />
        <input
          className="c-listItem__input"
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
