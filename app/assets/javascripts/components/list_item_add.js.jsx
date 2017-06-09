  var ListItemAdd = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      title: '',
      description: '',
      link: '',
      image_url: 'http://placehold.it/350x150',
      hasChanged: false,
      csrfToken: $('meta[name=csrf-token]').attr('content')
    };
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

  handleAddItemClick: function(event) {
    event.preventDefault();
    var self = this;
    var form = this.refs.uploadForm;
    formData = new FormData(form);
    App.setLoadingState(true);

    $.ajax({
      url: '/list_items/',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      self.getFlux().actions.listItem.addToUiOnly(data.list_item);
    })
    .fail(function() {
      console.error('Error adding new list item.');
    })
    .always(function() {
      App.setLoadingState(false);
    });
  },

  render: function() {
    return (
      <div className='ListItem ListItem--add'>
        <h2>Add Item</h2>
        <br />
        <label htmlFor='image'>Item image</label>
        <form ref='uploadForm' action='/list_items/' method='post' className="Form">

          <input
            name="list_id"
            className="u-d-none"
            value={ this.props.listId }
            readOnly></input>

          <input
            name="authenticity_token"
            className="u-d-none"
            value={ this.state.csrfToken }
            readOnly></input>
          <input
            type='file'
            name='image_main'
          />
          <br />

          <label htmlFor='title'>Item title</label>
          <input
            type='text'
            name='title'
            rows='1'
            onChange={ this.titleChange }
          />

          <br />
          <label htmlFor='description'>Item description</label>
          <textarea
            className="materialize-textarea"
            name='description'
            rows='4'
            onChange={ this.descriptionChange }
          />
          <br />

          <label htmlFor='link'>Item link</label>
          <input
            type='text'
            name='link'
            onChange={ this.linkChange }
          />
          <br />

          <button className="" onClick={ this.handleAddItemClick }>Add to list</button>
        </form>
      </div>
    );
  }
});
