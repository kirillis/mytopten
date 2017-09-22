
var ListItemAdd = React.createClass({
    mixins: [FluxMixin],

    componentDidMount: function () {
        var _this = this;
        var keyups = Rx.Observable.fromEvent(this.refs.titleInput, 'keyup')
            .pluck('target', 'value')
            .filter(function (text) {
                return text.length > 2;
            })
            .debounce(500)
            .distinctUntilChanged()
            .subscribe(function (data) {
                _this.props.onTitleEntered(data);
            });
    },

    isValid() {
        return this.state.title !== '' &&
            this.state.description !== '' &&
            this.state.link !== '';
    },

    getInitialState: function () {
        return {
            title: '',
            description: '',
            link: '',
            imageUrl: 'http://placehold.it/350x150',
            hasChanged: false,
            csrfToken: $('meta[name=csrf-token]').attr('content')
        };
    },

    descriptionChange: function (event) {
        this.setState({
            hasChanged: true,
            description: event.target.value
        });
    },

    linkChange: function (event) {
        this.setState({
            hasChanged: true,
            link: event.target.value
        });
    },

    titleChange: function (event) {
        this.setState({
            hasChanged: true,
            title: event.target.value
        });
    },

    imageUrlChange: function (event) {
        this.setState({
            hasChanged: true,
            imageUrl: event.target.value
        });
    },

    handleImagePicked: function (imageUrl) {
        console.log('handleImagePicked', imageUrl);
        this.setState({
            hasChanged: true,
            imageUrl: imageUrl
        });
    },

    handleAddItemClick: function (event) {
        event.preventDefault();
        if (!this.isValid()) {
            console.log('no valid');
            return;
        }
        console.log('valid');

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
        }).done(function (data) {
            self.getFlux().actions.listItem.addToUiOnly(data);
            self.setState({
                title: '',
                description: '',
                link: '',
                imageUrl: '',
                hasChanged: false,
            });
        }).fail(function () {
            console.error('Error adding new list item.');
        }).always(function () {
            App.setLoadingState(false);
        });
    },

    render: function () {
        return (
            <div className="ListItemAdd u-p-2 u-border-beta">
                <h2>Add new item</h2>
                <form ref='uploadForm' className='Form'>

                    <input
                        name='list_id'
                        className='u-d-none'
                        value={this.props.listId}
                        readOnly
                    />

                    <input
                        name='authenticity_token'
                        className='u-d-none'
                        value={this.state.csrfToken}
                        readOnly
                    />

                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        rows='1'
                        ref='titleInput'
                        onChange={this.titleChange}
                    />

                    <label htmlFor='description'>Description</label>
                    <textarea
                        name='description'
                        rows='4'
                        onChange={this.descriptionChange}
                    />

                    <label htmlFor='link'>Link</label>
                    <input
                        type='text'
                        name='link'
                        onChange={this.linkChange}
                    />

                    <img src={this.state.imageUrl} />

                    <label htmlFor='image_url'>Image URL</label>
                    <input
                        type='text'
                        name='image_url'
                        value={this.state.imageUrl}
                        onChange={this.imageUrlChange}
                    />

                    <ImageSearch onImagePicked={this.handleImagePicked}/>

                    <button className="Button Button--withIcon" onClick={this.handleAddItemClick}>
                        <i className="material-icons">add</i>
                        Add to list
                    </button>
                </form>
            </div>
        );
    }
});
