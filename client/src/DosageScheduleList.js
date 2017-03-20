import React from 'react';
import Client from './ds-dosage-schedule-http-client';
import RaisedButton from 'material-ui/RaisedButton';

const MATCHING_ITEM_LIMIT = 25;

class DosageScheduleList extends React.Component {

  // propsは、HTML要素の属性値のこと
  constructor(props) {
    super(props);

    // stateはクラス内部で管理する状態情報
    // 値は、setStateメソッド経由で変更する。
    // 変更すると、renderがコールされる
    this.state = {
      medicines: [],
      showRemoveIcon: false,
      searchValue: '',
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        medicines: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (medicines) => {
        this.setState({
          medicines: medicines.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      medicines: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };

  handleRaisedClick = () => {
    alert('click!');
  }

  render() {
    const { showRemoveIcon, medicines } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };
    const tdClassNames = ['right', 'aligned'];
    const tdClassName = tdClassNames.join(' ');
 
    const medicineRows = medicines.map((medicine, idx) => (
      <tr
        key={idx}
        onClick={() => this.props.onMedicineClick(medicine)}
      >
        <td></td>
        <td className={tdClassName}>{medicine.id}</td>
        <td className='right aligned'>{medicine.gtin}</td>
        <td className='right aligned'>{medicine.jan_code}</td>
        <td className='right aligned'>{medicine.summary}</td>
      </tr>
    ));

    return (
      <div id='medicine-search'>
        <RaisedButton label="Default" onClick={this.handleRaisedClick}/>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th colSpan='5'>
                <div className='ui fluid search'>
                  <div className='ui icon input'>
                    <input
                      className='prompt'
                      type='text'
                      placeholder='Search medicines...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className='search icon' />
                  </div>
                  <i
                    className='remove icon'
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th className='eight wide'>DosageScheduleList</th>
              <th>ID</th>
              <th>GTIN</th>
              <th>JAN</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {medicineRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DosageScheduleList;