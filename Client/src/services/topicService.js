import http from './httpService';

const apiEndpoint = '/heat';

function topicUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTopics() {
  return http.get(apiEndpoint);
}

export function getTopic(_id) {
  return http.get(topicUrl(_id));
}
