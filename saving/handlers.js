function save_snippet() {
  if (editor.session.currentlyUsingBlocks) {
    editor.toggleBlocks(function () {
      cb();
    });
  } else {
    cb();
  };

  function cb() {
    var code = editor.aceEditor.getValue();
    model.save_snippet(code);
    alert("snippet saved");
  }
}

function save_notes() {
  var text = notes.getValue();
  model.save_notes(text);
  alert("notes saved");
}

function clear_session() {
  if (confirm("are you sure you want to clear this session ?")){
    model.clear_notes();
    model.clear_snippets();
    alert("notes & snippets are erased");
  }
}

function download_session() {

  var notes = model.get_notes();
  var snippets = model.get_snippets();

  if (notes.length === 0 && snippets.length === 0) {

    alert("session is empty, no downloading");

  } else {

    var text = stringify_for_download(notes, snippets);

    var filename_input = document.getElementById("file-name").value;
    var filename;
    if (filename_input) {
      filename = filename_input;
    } else {
      filename = "study-session.js";
    };

    download(filename, text);

    alert("successfully downloaded session");

  };
}

function stringify_for_download(notes, snippets) {
  var text = "";
  
  text += "/*\n";
  text += notes;
  text += "\n*/\n\n";

  for (var i = 0; i < snippets.length; i++) {
    text += "/* --- snippet "+i+" --- */ {\n\n";
    text += snippets[i];
    text += "\n\n} ";

    // text += "/* --- snippet "+i+" --- */ {\n\n";
    // text += snippets[i];
    // text += "\n\n} // ---  end  "+i+" ---";
  };

  return text;
}



// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
