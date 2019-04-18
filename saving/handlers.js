var num_snippets = 0;

function save_snippet() {
  if (editor.session.currentlyUsingBlocks) {
    editor.toggleBlocks(function () {
      cb();
    });
  } else {
    cb();
  };

  function cb() {
    var snippet = editor.aceEditor.getValue();
    var old_notes = notes.getValue();
    var tabbed_snippet = snippet.replace(/\n/g, '\n\t');
    var new_notes = old_notes  
                    + "/* --- snippet "+num_snippets+" --- */ {\n\n"
                    + '\t' + tabbed_snippet
                    + "\n} ";
    num_snippets += 1;
    notes.setValue(new_notes);
    alert("snippet saved");
  }
}

function download_session() {

  var text = notes.getValue();

  var filename_input = document.getElementById("file-name").value;
  var filename;
  if (filename_input) {
    filename = filename_input;
  } else {
    filename = "study-session.js";
  };

  download(filename, text);

  alert("successfully downloaded session");

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
