import React, { Component } from 'react';
import { getTopics } from '../services/topicService';
import TopicsTable from './topicsTable';
import SearchBox from './common/searchBox';
import _ from 'lodash';

class Topics extends Component {
  state = {
    topics: [],
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data: topics } = await getTopics();
    this.setState({ topics });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  getFilteredData = () => {
    const { sortColumn, topics: allTopics, searchQuery } = this.state;

    let filtered = allTopics;
    if (searchQuery)
      filtered = allTopics.filter(
        t =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.keywords.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
          t.relatedText1
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          t.relatedText2.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { totalCount: filtered.length, data: sorted };
  };

  render() {
    const { length: count } = this.state.topics;
    const { sortColumn, searchQuery } = this.state;
    if (count === 0) return <p>'There are no topics in the Knowledge Base</p>;

    const { totalCount, data: topics } = this.getFilteredData();
    return (
      <div className='row'>
        <div className='col'>
          <h1>Knowledge Base</h1>
          <span>
            Showing <b>{totalCount} topics</b> in the knowledge Base
          </span>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <TopicsTable
            topics={topics}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
        </div>
      </div>
    );
  }
}

export default Topics;
