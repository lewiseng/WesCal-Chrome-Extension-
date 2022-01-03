let x = document.getElementsByClassName("full-width content-section banner")[0].getElementsByTagName("img")[0];
const img = document.createElement("img");
img.src = "https://i.ibb.co/qggBksq/Elmo.png";
x.replaceWith(img);

let y = document.querySelector("head title")
y.innerText = y.innerText.replace(/Roth/g, "Sesame");
y.innerText = y.innerText.replace(/Michael/g, "Elmo");



function walkText(node) {
    if (node.nodeType == 3) {
      node.data = node.data.replace(/Roth/g, "Sesame");
      node.data = node.data.replace(/Michael/g, "Elmo");
    }
    if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
      for (var i = 0; i < node.childNodes.length; i++) {
        walkText(node.childNodes[i]);
      }
    }
  }

walkText(document.body);