const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  switch (xhr.readyState) {
    case 0: // 未初期化状態.
      console.log('uninitialized!');
      break;
    case 1: // データ送信中.
      document.getElementById('list').innerHTML = 'loading...';
      break;
    case 2: // 応答待ち.
      document.getElementById('list').innerHTML = 'loaded.';
      break;
    case 3: // データ受信中.
      break;
    case 4: // データ受信完了.
      if (xhr.status == 200 || xhr.status == 304) {
        document.getElementById('list').innerHTML = 'COMPLETE!';
        const data = xhr.response;
        let body = '';
        for (const row of data) {
          body += `${row.name} <br />`;
        }
        document.getElementById('list').innerHTML = body;
      } else {
        document.getElementById('list').innerHTML = `Failed. HttpStatus: ${xhr.statusText}`;
      }
      break;
    default:
      document.getElementById('list').innerHTML = 'おいっすー';
  }
};

xhr.open('GET', 'https://pcyp-web.herokuapp.com/api/list', true);
xhr.responseType = 'json';
xhr.send();
