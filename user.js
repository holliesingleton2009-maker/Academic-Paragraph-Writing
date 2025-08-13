window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  var p = GetPlayer();

// 1) Get the live values from Storyline variables
var answer      = p.GetVar("AnswerTextEntry")      || "";
var evidence    = p.GetVar("EvidenceTextEntry1")   || "";
var explanation = p.GetVar("ExplanationTextEntry") || "";

// 2) Combine them into one string separated by spaces
var textToCopy = answer + " " + evidence + " " + explanation;

// 3) Copy to clipboard (modern API with fallback)
function copy(text){
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand("copy"); } finally { document.body.removeChild(ta); }
  return Promise.resolve();
}

copy(textToCopy).then(function(){
  alert("Text copied to clipboard!");
}).catch(function(){
  alert("Failed to copy text to clipboard.");
});


}

};
