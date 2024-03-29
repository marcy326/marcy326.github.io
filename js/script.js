// スクロールの初期位置を一番下に設定
function scrollToBottom() {
    let target = document.getElementById('scroll');
    target.scrollTo(0, target.scrollHeight); 
}

// テキストエリアの高さを自動調整
window.addEventListener("DOMContentLoaded", () => {
    setMessageHeight();
    scrollToBottom();

    var textareaEl = document.getElementById("message");
  
    // デフォルト値としてスタイル属性を付与
    textareaEl.setAttribute("style", `height: ${textareaEl.scrollHeight}px;`);
    // inputイベントが発生するたびに関数呼び出し
    textareaEl.addEventListener("input", setTextareaHeight);
    textareaEl.addEventListener("input", setMessageHeight);
    textareaEl.addEventListener("input", scrollToBottom);
    
    window.addEventListener("resize", setMessageHeight);
});

// textareaの高さを計算して指定する関数
function setTextareaHeight() {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
}

// テキストエリアとヘッダーの高さを取得して、メッセージ部分のmargin調整
function getHeight(id_name){
    var obj = document.getElementById(id_name);
    var h = obj.offsetHeight;
    return h;
};

function setMessageHeight() {
    var messages = document.getElementById("scroll");
    messages.style.marginTop =  (getHeight("header"))+'px';
    messages.style.marginBottom =  (getHeight("footer"))+'px';
}

// HTMLエスケープ
function escape_html (string) {
  if(typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function(match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}

// 送信時の処理
function sendMessage() {
    // テキストエリアの値を取得
    var textareaEl = document.getElementById("message");
    var textareaValue = message.value;
    textareaValue = escape_html(textareaValue);
    if (textareaValue != ""){
        textareaValue = textareaValue.split("\n").join("<br>");

        var now = new Date();
        var Hour = now.getHours().toString().padStart(2, '0');
        var Min = now.getMinutes().toString().padStart(2, '0');

        // HTMLに追加
        var outputDiv = document.getElementById("scroll");
        outputDiv.innerHTML += '<div class="balloon_right"><p>' + textareaValue + '</p><div class="timestamp">' + Hour + ':' + Min + '</div></div>';

        // テキストエリアをクリア
        textareaEl.value = "";
        textareaEl.style.height = "auto";
        textareaEl.style.height = `${textareaEl.scrollHeight}px`;
        setMessageHeight();

        scrollToBottom();
    }
}

// Submitボタンが押された時の処理
document.getElementById("footer").addEventListener("submit", function(event) {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
    sendMessage();
});

// Shift+Enterキーが押されたときの処理
document.getElementById("footer").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault(); // デフォルトの改行を防ぐ
        sendMessage();
    }
});