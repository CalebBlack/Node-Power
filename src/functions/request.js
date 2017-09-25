const request = function (url,method='get', auth, content) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    if (auth) {
      xhr.setRequestHeader('Authorization', generateAuthStrings(auth));
    }
    if (content) {
      if (typeof content === 'object') {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(content));
      } else {
        xhr.send(content);
      }
    } else {
      xhr.send();
    }
  });
}
function generateAuthStrings(strings) {
    var string = strings.join(':');
    var hash = window.btoa(string);
    return 'Basic ' + hash;
}
export default request;
