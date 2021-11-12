import React, { useState, useEffect } from 'react';
import { getTopic } from './../services/topicService';
import { Modal, Button } from 'react-bootstrap';

function TopicModal({ id, onHide, ...rest }) {
  const [topic, setTopic] = useState({});

  useEffect(() => {
    async function getInfo() {
      const { data: topic } = await getTopic(id);
      if (!topic) return this.props.history.replace('/');
      setTopic(topic);
    }
    getInfo();
  }, [id]);

  const handleOpenAttachment = () => {
    const { fileType, base64Data, mime } = topic;
    const byteCharacters = atob(base64Data);
    let blobUrl = null;
    const byteArrays = [];
    const sliceSize = 512;

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: mime });
    const link = window.document.createElement('a');
    blobUrl = URL.createObjectURL(blob);
    if (fileType === '.pdf') window.open(blobUrl);
    else {
      link.href = blobUrl;
      link.download = `TempFile-Delete.${topic.fileType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <Modal
      {...rest}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          {topic.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div dangerouslySetInnerHTML={{ __html: topic.details }} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          disabled={!topic.base64Data}
          onClick={handleOpenAttachment}>
          Open Attachment
        </Button>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TopicModal;
