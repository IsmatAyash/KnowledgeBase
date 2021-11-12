import React, { useState } from 'react';
import TopicModal from './topicModal';
import Table from './common/table';
import { Button } from 'react-bootstrap';

function TopicsTable({ topics, onSort, sortColumn }) {
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState('');

  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: topic => (
        <Button variant='link' onClick={() => handleShowModal(topic._id)}>
          {topic.title}
        </Button>
      ),
    },
    { path: 'fileType', label: 'File Type' },
    { path: 'keywords', label: 'Keywords' },
    { path: 'relatedText1', label: 'Related Title' },
    { path: 'relatedText2', label: 'Related Title' },
  ];

  const handleShowModal = id => {
    setModalShow(true);
    setId(id);
  };

  return (
    <React.Fragment>
      <Table
        data={topics}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TopicModal show={modalShow} id={id} onHide={() => setModalShow(false)} />
    </React.Fragment>
  );
}

export default TopicsTable;
