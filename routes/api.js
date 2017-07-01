const express = require('express');
const request = require('sync-request');

const router = express.Router();
const uriSp = 'http://bayonet.ddo.jp/sp/index.txt';

function getInfo() {
  const response = request(
    'GET',
    uriSp
  );

  const info = [];
  if (response.statusCode === 200) {
    const body = response.getBody('utf8').split('\n');
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
          comment: columns[18],
        }
      );
    }
  }

  return info;
}

router.get('/api/list', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(getInfo());
});

router.get('/api', (req, res) => {
  res.render('index', { title: 'api root' });
});

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
