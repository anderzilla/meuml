import React from 'react';
import Checkbox from './Partials/Checkbox';
import Inputflix from './Partials/Input';
import Radioflix from './Partials/Radio';

export default class Testes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedValue: 1
    }
  }

  isChecked(value) {
    if(value === this.state.checkedValue) {
      return true;
    } else {
      return false;
    }
  }

  onclick(which) {
    console.log(which);
  }

  render() {
    const config = [
      { name: 'radio', id: 'radio1', value: 'radio1', label: 'Radio Value 1' },
      { name: 'radio', id: 'radio2', value: 'radio2', label: 'Radio Value 2' },
      { name: 'radio', id: 'radio3', value: 'radio3', label: 'Radio Value 3' }
    ]

    return (
      <div>
        <Checkbox
          value="checkboxComponent"
          disabled={false}
        >Este é um Componente checkbox
        </Checkbox>
        <Inputflix
          className=""
          placeholder="Este é um placeholder"
          width="5"
          size="sm"
          valid=""
          invalid=""
          tooltip="This is a Tooltip"
          autoFocus={true} />
        <Radioflix
          config={config}
        />
      </div>
    );
  }
}