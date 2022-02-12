(function(window) {
    console.log("inside env.js")
    window.env = window.env || {};
  console.log(window.env);
    // Environment variables
    window["env"]["apiUrl"] = "${API_URL}";
    window["env"]["debug"] = "${DEBUG}";
    console.log("${API_URL}");
  })(this);