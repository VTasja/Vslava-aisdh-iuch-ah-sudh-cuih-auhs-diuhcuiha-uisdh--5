
import React from 'react';

import TableEditorForm from './table_editor_form';
import TableEditorRecord from './table_editor_record';

import pluralize from 'pluralize'
import update from 'immutability-helper';

class TableEditor extends React.Component {

  constructor(props) {
    super(props);

    this._initState();
    this._initVars();
    this._bindMethods();
  }

  _initState() {
    this.state = {
      show: false,
      records: []
    };
  }

  _initVars() {
    this.model = {
      name: this.props.modelName,
      url: pluralize.plural(this.props.modelName),
      fields: []
    };

    this.tableTitle = '';
  }

  _bindMethods() {
    this.addRecord = this.addRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/' + this.model.url,
      dataType: 'JSON',
      success: (data) => {
        this.model.fields = data.fields;
        this.tableTitle = data.title;
        this.setState({
          show: true,
          records: data.records
        });
      }
    });
  }

  addRecord(record) {
    const records = update(this.state.records, { $push: [record] });
    this.setState({ records });
  }

  deleteRecord(record) {
    const index = this.state.records.indexOf(record);
    const records = update(this.state.records, { $splice: [[index, 1]] });
    this.setState({ records });
  }

  updateRecord(record, data) {
    const index = this.state.records.indexOf(record);
    const records = update(this.state.records, { $splice: [[index, 1, data]] });
    this.setState({ records });
  }

  render() {
    return (
      <div className="editor">
        <h2 className="title">{this.tableTitle}</h2>
        <TableEditorForm handleNewRecord={this.addRecord} />
        <table className="table table-bordered">
          <thead>
            <tr>
              {this.model.fields.map((item) => <th key={item.property}>{item.title}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map((record) =>
              <TableEditorRecord key={record.updated_at} record={record} model={this.model} handleDeleteRecord={this.deleteRecord} handleUpdateRecord={this.updateRecord} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableEditor;
