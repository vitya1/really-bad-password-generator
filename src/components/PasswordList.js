import React, { Component }  from 'react';
import { PasswordItem } from './PasswordItem';

export class PasswordList extends Component {
  render() {
    const rows_amount = 3;
    const rows = [];
    let i = 0;
    while (i < this.props.value.length) {
      let row = [];
      for (let j = 0; j < rows_amount; j++) {
        row.push(this.props.value[i++] || '');
      }
      rows.push(row);
    }
    return (
    <div className="container">
      {
          rows.map((passwords, i) => 
          <div className="row" key={i}>
            {
                passwords.map((password, j) => 
                <div className="col" key={j}>
                    <PasswordItem value={password}></PasswordItem>
                </div>
                )
            }
        </div>
        )
      }
    </div>
    );
  }
}
