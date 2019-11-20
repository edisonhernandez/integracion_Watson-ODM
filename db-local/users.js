var records = [
    {id: 1, username: 'crivas', password: 'Carlos123'},
    {id: 2, username: 'Chema', password: 'Chema123'},
    {id: 3, username: 'etienne', password: 'ibm123'},
    {id: 4, username: 'Doncel', password: 'Doncel123'},
    {id: 5, username: 'Enrique', password: 'Tevar123'},
    {id: 6, username: 'Inma', password: 'Inma123'},
    {id: 7, username: 'cognitivelegal', password: 'ibm'},
    {id: 8, username: 'alejandro', password: 'soa'}
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    }
    else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}