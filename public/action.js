let ids = [];

clearTBody = () => {
  // let tbodies = document.getElementsByTagName("tbody");
  // for (let i = 0; i < tbodies.length; i++) {
  //     while (tbodies[i].rows.length > 0) {
  //         tbodies[i].deleteRow(0);
  //     }
  // }
  
  var Table = document.getElementById("user-info-body");
  Table.innerHTML = "<tr></tr>";
}

insertCell = (user) => {
  let table = document.getElementById('all-user');
  let newRow = table.insertRow();

  let newCell = newRow.insertCell();
  let newText = document.createTextNode(user.id);
  newCell.appendChild(newText);

  newCell = newRow.insertCell();
  newText = document.createTextNode(user.name);
  newCell.appendChild(newText);

  newCell = newRow.insertCell();
  newText = document.createTextNode(user.email);
  newCell.appendChild(newText);

  newCell = newRow.insertCell();
  let newInput = document.createElement('input');
  newInput.type = 'checkbox';
  newInput.id = `regist-${user.id}`;
  newCell.appendChild(newInput);

  ids.push(user.id);

  // let myobj = document.getElementById(`regist-${user.id}`);
  // myobj.onchange = change(user.id);
}

getAllUserFromAPI = async () => {
  const url = `${location.origin}/user-info/all`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await (await fetch(url, options)).json();
  res.forEach(user => {
    insertCell(user);
  })
}

resetTable = () => {
  clearTBody();
  getAllUserFromAPI();
}

deleteUser = () => {
  const delId = [];
  ids.forEach(id => {
    const checkBox = document.getElementById(`regist-${id}`);
    if (checkBox.checked) delId.push(id);
    console.log(checkBox.checked);
  });
  if (delId.length !== 0) {
    const res = confirm(`${delId}を削除しますか？`);
    if (res) {
      console.log('delete');
      resetTable();
    } else {
      console.log('cancel');
    }
  } else {
    alert(`削除対象が選択されていません`);
  }
  
};

change = (id) => {
  console.log(`change ${id}`);
}

getAllUserFromAPI();