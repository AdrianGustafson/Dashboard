import React from 'react';

class PageEditor extends React.Component {
  render() {
    const { page } = this.props;
    return (
      <div className="widget">
        <div className="widget__header">
          <h2>{page.name}</h2>
        </div>

      </div>
    )
  }
}

export default PageEditor
