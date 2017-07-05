
var ListItemAdd = React.createClass({
mixins: [FluxMixin],

componentDidMount: function() {
  var _this = this;
  var keyups = Rx.Observable.fromEvent(this.refs.titleInput, 'keyup')
    .pluck('target', 'value')
    .filter(function (text) {
      return text.length > 2;
    })
    .debounce(500)
    .distinctUntilChanged()
    .subscribe(
      function (data) {
        console.log('debounced: ', data);
        _this.props.onTitleEntered(data);
      }
    );
},

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
    self.getFlux().actions.listItem.addToUiOnly(data);
    self.setState({
      title: '',
      description: '',
      link: '',
      image_url: '',
      hasChanged: false,
    });
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
    <div className="ListItemAdd u-p-2 u-border-beta">
      <h2>Add new item</h2>
      <form ref='uploadForm' action='/list_items/' method='post' className='Form'>

        <input
          name='list_id'
          className='u-d-none'
          value={ this.props.listId }
          readOnly
        />

        <input
          name='authenticity_token'
          className='u-d-none'
          value={ this.state.csrfToken }
          readOnly
        />

        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          rows='1'
          ref='titleInput'
        />

        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          rows='4'
          onChange={ this.descriptionChange }
        />

        <label htmlFor='title'>Image</label>
        <br />
        <input
          type='file'
          name='image_main'
        />

        <label htmlFor='link'>Link</label>
        <input
          type='text'
          name='link'
          onChange={ this.linkChange }
        />

        <button className="Button Button--withIcon" onClick={ this.handleAddItemClick }>
          <i className="material-icons">add</i>
          Add to list
        </button>
      </form>
    </div>
  );
}
});
