  var ListItemAdd = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      title: '',
      description: '',
      link: '',
      image_url: 'http://placehold.it/350x150',
      hasChanged: false
    }
  },

  imageChange: function(event) {
    console.log(event, event.target.value.split(/(\\|\/)/g).pop());
  },

  titleChange: function(event) {
    this.setState({
      hasChanged: true,
      title: event.target.value
    });
  },

  descriptionChange: function(event) {
    this.setState({
      hasChanged: true,
      description: event.target.value
    });
  },

  linkChange: function(event) {
    this.setState({
      hasChanged: true,
      link: event.target.value
    });
  },

  handleAddItemClick: function() {
    console.log('handleAddItemClick', this.state);
    this.getFlux().actions.listItem.add(this.state);
  },

  render: function() {
    return (
      <div className='ListItem ListItem--add'>

        <label htmlFor='image'>Item image</label>
        <input
          type='file'
          name='image'
          onChange={ this.imageChange }
        />
        <br />

        <label htmlFor='title'>Item title</label>
        <input
          type='text'
          name='title'
          rows='1'
          value={ this.state.title }
          onChange={ this.titleChange }
        />

        <label htmlFor='title'>Item description</label>
        <textarea
          name='title'
          rows='4'
          value={ this.state.description }
          onChange={ this.descriptionChange }
        />

        <label htmlFor='title'>Item link</label>
        <input
          type='text'
          name='title'
          rows='4'
          value={ this.state.link }
          onChange={ this.linkChange }
        />
        <button onClick={ this.handleAddItemClick }>Add to list</button>
      </div>
    );
  }
});
