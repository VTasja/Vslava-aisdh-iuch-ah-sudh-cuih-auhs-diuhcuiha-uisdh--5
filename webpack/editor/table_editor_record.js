
import React from 'react';
import ReactDOM from 'react-dom';

class TableEditorRecord extends React.Component {

  constructor(props) {
    super(props);

    this._initState();
    this._initVars();
    this._bindMethods();
  }

  _initState() {
    this.state = { edit: false };
  }

  _initVars() {
    this.record = this.props.record;
    this.model = this.props.model;
  }

  _bindMethods() {
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleToggle(e) {
    e.preventDefault();

    this.setState({
      edit: !this.state.edit
    });
  }

  handleDelete(e) {
    e.preventDefault();

    $.ajax({
      method: 'DELETE',
      url: '/' + this.model.url + '/' + this.record.id,
      dataType: 'JSON',
      success: () => {
        this.props.handleDeleteRecord(this.record)
      }
    });
  }

  handleUpdate(e) {
    e.preventDefault();

    let data = {};

    this.model.fields.forEach((field) => {
      data[field.property] = ReactDOM.findDOMNode(this.refs[field.property]).value
    });

    $.ajax({
      method: 'PUT',
      url: '/' + this.model.url + '/' + this.record.id,
      dataType: 'JSON',
      data: {
        [this.model.name]: data
      },
      success: (data) => {
        this.setState({ edit: false });
        this.props.handleUpdateRecord(this.record, data);
      }
    });
  }

  recordForm() {
    return (
      <tr>
        {this.model.fields.map((field, index) => (
            <td key={index}>
              <input className="form-control" type="text" defaultValue={this.record[field.property]} ref={field.property} />
            </td>
        ))}
        <td>
          <a className="btn btn-default" onClick={this.handleUpdate} >Update</a>
          <a className="btn btn-danger" onClick={this.handleToggle} >Cancel</a>
        </td>
      </tr>
    );
  }

  recordRow() {
    return (
      <tr>
        {this.model.fields.map((field, index) => (
            <td key={index}>{this.record[field.property]}</td>
        ))}
        <td>
          <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  }

  render() {
    return this.state.edit ? this.recordForm() : this.recordRow();
  }
}

export default TableEditorRecord;
