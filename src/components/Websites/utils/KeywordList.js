import React from 'react';


const KeywordList = ({ keywords, onRemoveKeywordHandler }) => {
  return (
    <div className="keyword-list">
      {
        keywords.map(keyword => {
          return (
            <span className="keyword-default keyword-pill"
              key={keyword}>
              <i className="fas fa-times"
                onClick={onRemoveKeywordHandler(keyword)}>
              </i>
              {keyword}
            </span>
          )
        })
      }
    </div>
  )
}

export default KeywordList;
