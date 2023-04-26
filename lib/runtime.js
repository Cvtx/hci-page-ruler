app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};

app.on.message(function (request, sender) {
  if (request) {
    if (request.path === "page-to-background") {
      for (var id in app.page.message) {
        if (app.page.message[id]) {
          if ((typeof app.page.message[id]) === "function") {
            if (id === request.method) {
              var a = request.data || {};
              if (sender) {
                a.frameId = sender.frameId;
                /*  */
                if (sender.tab) {
                  if (a.tabId === undefined) a.tabId = sender.tab.id;
                  if (a.title === undefined) a.title = sender.tab.title ? sender.tab.title : '';
                  if (a.url === undefined) a.url = sender.tab.url ? sender.tab.url : (sender.url ? sender.url : '');
                }
              }
              /*  */
              app.page.message[id](a);
            }
          }
        }
      }
    }
  }
});