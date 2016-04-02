var ListItem = React.createClass({
  // mixins: [FluxMixin],

  titleChange: function(event) {
    // this.props.onChange();
    this.setState({
      title: event.target.value
    });
  },

  descriptionChange: function(event) {
    var data = {
      description: event.target.value,
      id: this.props.data.id
    };

    // this.props.onChange(data);
    this.setState({
      description: event.target.value
    });
  },

  // saveData: function() {
  //   var itemData = this.props.data;
  //   var newItemData = $.extend({}, itemData);
  //   newItemData.title = this.state.title;
  //   newItemData.description = this.state.description;
  //   this.getFlux().actions.listItem.update(itemData, newItemData);
  //   this.setState({hasChanged: false});
  // },

  deleteEntry: function() {
    console.log('listitem deleteEntry');
    // this.getFlux().actions.listItem.delete(this.props.data.id);
  },

  getInitialState: function() {
    return {
      title: this.props.data.title,
      description: this.props.data.description,
    };
  },

  // componentWillReceiveProps: function(nextProps) {
  //   this.setState({
  //     title: nextProps.data.title,
  //     description: nextProps.data.description,
  //   });
  // },

  render: function() {
    $('.js-elastic').elastic();
    var classes = classNames({
      'c-listItem': true
    });

    return (
      <li className={ classes } data-id={ this.props.data.id }>
        <textarea
          rows="4"
          className="c-listItem__textarea c-listItem__textarea--h3 js-elastic"
          defaultValue={ this.props.data.title }
          value={ this.state.title }
          onChange={ this.titleChange }
        />
        <a href={ this.props.data.link } className="c-listItem__link">
          <img src={ this.props.data.image_url } className="c-listItem__link" />
        </a>
        <textarea
          rows="1"
          className="c-listItem__textarea js-elastic"
          defaultValue={ this.props.data.description }
          value={ this.state.description }
          onChange={ this.descriptionChange }
        />
        <button className="c-button" onClick={ this.deleteEntry }>Delete</button>

      </li>
    );
  }
});
