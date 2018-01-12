
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
            this.state.image_thumb_url !== '' &&
            this.state.description !== '';
    },

    getInitialState: function () {
        return {
            title: '',
            description: '',
            link: '',
            image_thumb_url: '/assets/images/add_placeholder.jpg',
            image_large_url: '',
            hasChanged: false
        };
    },

    descriptionChange: function (text) {
        this.setState({
            hasChanged: true,
            description: text
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
            image_thumb_url: event.target.value
        });
    },

    handleImagePicked: function (image_thumb_url, image_large_url) {
        this.setState({
            hasChanged: true,
            image_thumb_url: image_thumb_url,
            image_large_url: image_large_url,
        });
    },

    handleAddItemClick: function (event) {
        event.preventDefault();
        if (!this.isValid()) {
            toastr.warning('Please fill out all required fields.');
            return;
        }

        this.getFlux().actions.listItem.add(this.state);
        this.setState({
            title: '',
            description: '',
            link: '',
            image_thumb_url: '/assets/images/add_placeholder.jpg',
            image_large_url: '',
            hasChanged: false
        });
    },

    render: function () {
        return (
            <div className="ListItemAdd u-p-2 u-border-beta">
                <h2>Add a new item</h2>
                <div className='Form'>
                    <div className="Grid">
                        <div className="Grid-cell 1-of-4--handheld-and-up">
                            <div className="ListItemAdd--imageWrapper">
                                <img src={this.state.image_thumb_url} className="ListItemAdd--image" /><br />
                                <ImageSearch onImagePicked={this.handleImagePicked} />
                            </div>
                        </div>
                        <div className="Grid-cell 3-of-4--handheld-and-up">

                            <label htmlFor='title'>Title</label>
                            <input
                                type='text'
                                name='title'
                                rows='1'
                                ref='titleInput'
                                value={this.state.title}
                                onChange={this.titleChange}
                            />

                            <label htmlFor='description'>Description</label>
                            <QuillEditor
                                elementId='list-item-add'
                                text={this.state.description}
                                handleInput={this.descriptionChange} />

                            <button className="Button Button--withIcon" onClick={this.handleAddItemClick}>
                                <i className="material-icons">add</i>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
