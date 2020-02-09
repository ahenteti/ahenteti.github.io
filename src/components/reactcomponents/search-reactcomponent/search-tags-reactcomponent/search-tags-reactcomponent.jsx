import * as React from 'react';
import './search-tags-reactcomponent.scss';
import SelectReactComponent from 'components/reactcomponents/select-reactcomponent/select-reactcomponent';

class SearchTagsReactComponent extends React.Component {
  render() {
    return (
      <div className='search-tags-reactcomponent'>
        <SelectReactComponent
          selectedOption={this.props.selectedTag}
          options={this.props.tags}
          selectOption={this.props.selectTag}
        />
      </div>
    );
  }
}

export default SearchTagsReactComponent;
