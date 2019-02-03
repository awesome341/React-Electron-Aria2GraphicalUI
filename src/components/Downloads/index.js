import React, { PureComponent } from 'react';
import {
  Table,
} from 'antd';
import changePage from 'Root/helpers/changePage';
import addToQueue from 'Root/actions/downloads/addToQueue';

export default class extends PureComponent {
  render() {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        render: (text, record) => (
          <a onClick={() => changePage(`/download/${record.key}`)}>
            {text}
          </a>
        ),
      },
      {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (text) => {
          if (text === 'downloading') {
            return 'Downloading..';
          }

          if (text === 'pause' || text === 'suspend') {
            return 'Pause';
          }

          return 'Completed';
        },
      },
      {
        title: 'Percent',
        key: 'percent',
        dataIndex: 'percent',
        render: text => `${text}%`,
      },
      {
        title: 'Actions',
        key: 'actions',
        dataIndex: 'actions',
        render: (text, record) => {
          if (record.queue) {
            return (
              <a
                onClick={() => {}}
                disabled={record.downloadStatus === 'completed'}
              >
                Remove from queue
              </a>
            );
          }

          return (
            <a
              onClick={() => addToQueue(record.key)}
              disabled={record.status === 'completed'}
            >
              Move to queue
            </a>
          );
        },
      },
    ];

    const data = this.props.downloads.map(i => ({
      key: i.id,
      name: i.name,
      status: i.downloadStatus,
      category: i.category,
      percent: Math.floor(
        (100 * parseInt(i.completedLength, 10))
        / parseInt(i.totalLength, 10),
      ),
      queue: i.queue,
    }));

    return (
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        style={{
          backgroundColor: 'white',
        }}
        size="small"
      />
    );
  }
}
