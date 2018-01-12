var QuillEditor = React.createClass({
  componentDidMount: function () {
    let self = this;

    // Add getHtml function to get html from editor textarea.
    Quill.prototype.getHtml = function () {
      return this.container.querySelector('.ql-editor').innerHTML;
    };

    this.initQuillEditor();
    this.quill.clipboard.dangerouslyPasteHTML(this.props.text);
    this.bindQuillEditorEvent();
  },
  
  componentWillUpdate: function (nextProps) {
    if(nextProps.text == '') {
      this.quill.setContents([{ insert: '\n' }]);
    }
  },

  initQuillEditor: function () {
    this.quill = new Quill('#' + this.props.elementId, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'link']
        ],
        clipboard: true
      },
      placeholder: 'Enter text here...',
      theme: 'snow'
    });
  },

  bindQuillEditorEvent: function () {
    let self = this;
    this.quill.on('text-change', function (delta, oldDelta, source) {
      if (source == 'user') {
        self.props.handleInput(self.quill.getHtml());
      }
    });
  },

  render: function () {
    return (
      <div className="QuillEditor">
        <div id={this.props.elementId}>
        </div>
      </div>
    )
  }
});
