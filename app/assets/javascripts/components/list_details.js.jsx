var ListDetails = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      title: this.props.title,
      description: this.props.description
    };
  },

  titleChange: function(event) {
    this.setState({ title: event.target.value });
  },

  render: function() {
    return (
      <div className='c-listDetails'>
        <input
          value={ this.state.title }
          onChange={ this.titleChange }
        />
        <input>{ this.state.description }</input>
      </div>
    );
  }
});
