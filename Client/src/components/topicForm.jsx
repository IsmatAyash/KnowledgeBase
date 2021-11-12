import React, { Component } from 'react';
import { getTopic } from '../services/topicService';

class TopicForm extends Component {
  state = {
    data: {
      title: '',
      attachment: '',
      details: '',
      fileType: '',
      fileName: '',
    },
    errors: {},
  };

  componentDidMount() {
    const _id = this.props.match.params.id;
    console.log('Recid In form', _id);
    const topic = getTopic(_id);
    if (!topic) return this.props.history.replace('/');

    this.setState({ data: this.mapToViewModel(topic) });
  }

  mapToViewModel(topic) {
    return {
      _id: topic._id,
      title: topic.title,
      attachment: topic.attachmentData,
      details: topic.details,
      fileName: topic.attachmentData_FileName,
      fileType: topic.attachmentData_FileType,
    };
  }

  doSubmit = () => {
    console.log('Submitted');
  };

  render() {
    const { title, attachment, details } = this.state;
    return (
      <div>
        <h1>Topic Form </h1>
        <form>
          <div className='form-group'>
            <label>{title}</label>
          </div>
          <div className='form-group'>
            <textarea
              name='attachment'
              id='attachment'
              className='form-control'>
              {attachment}
            </textarea>
          </div>
          <div className='form-group'>
            <textarea
              name='attachment'
              id='attachment'
              className='form-control'>
              {details}
            </textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default TopicForm;
