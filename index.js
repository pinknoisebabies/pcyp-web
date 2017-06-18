const express = require('express');
const request = require('sync-request');

const app = express();
const uriSp = 'http://bayonet.ddo.jp/sp/index.txt';

app.set('port', (process.env.PORT || 3000));

const server = app.listen(app.get('port'), () => {
  console.log('Node.js is listening to PORT:' + server.address().port);
});

function getInfo() {
  const response = request(
    'GET',
    uriSp
  );

  if (response.statusCode === 200) {
    const body = response.getBody('utf8').split('\n');
    const info = [];

    for (const row of body) {
      const columns = row.split('<>');

      info.push(
        {
          name: columns[0],
          hash: columns[1],
          ip: columns[2],
          contact: columns[3],
          genre: columns[4],
          title: columns[5],
          comment: columns[18]
        }
      );
    }

    return info;
  }
}

app.get('/api/list', (req, res) => {
  res.json(getInfo());
});
