function generate_permalink(snippet, map, viztool) {
  var encoded_snippet = map(snippet);
  var permalink = "https://janke-learning.github.io/"+viztool+"/?snippet="+encoded_snippet;
  return permalink
};

function encode_query(string_challenge) {
  var encoded = encodeURIComponent(string_challenge);
  var sanitized = encoded.replace(/\(/g, '%28').replace(/\)/g, '%29');
  var de_tabbed = sanitized.replace(/%09/g, '%20%20');
  return de_tabbed
};

// sanitization from:  https://github.com/pgbovine/OnlinePythonTutor/blob/0dcdacc7ff5be504dd6a47236ebc69dc0069f991/v5-unity/js/opt-frontend.ts#L62


function open_in(viztool) {
  if (editor.session.currentlyUsingBlocks) {
    editor.toggleBlocks(function () {
      cb(viztool);
    });
  } else {
    cb(viztool);
  };

  function cb(viztool) {
    var code = editor.aceEditor.getValue();
    var url = generate_permalink(code, encode_query, viztool);
    window.open(url, '_blank');
  }
};


