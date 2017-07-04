## Add Custom Buttons 

It's explained more in (http://hardlikesoftware.com/weblog/2017/01/24/how-to-hack-apex-interactive-grid-part-2/)

```javascript
function(config) {
    var $ = apex.jQuery,
        toolbarData = $.apex.interactiveGrid.copyDefaultToolbar(),
        toolbarGroup = toolbarData[toolbarData.length - 1]; // this is the last group with reset button
        // you can also use toolbarData.toolbarFind("actions4");

    // add our own button
    toolbarGroup.controls.push( {
        type: "BUTTON",
        action: "download-file-custom",
        iconBeforeLabel: true
    });
    config.toolbarData = toolbarData;

    config.initActions = function( actions ) {
        // can modify state of existing actions or add your own
        // can also pass in an array of actions to add
        actions.add( {
            name: "download-file-custom",
            label: "Download File",
            icon: "icon-ig-download",
            action: function(event, focusElement) {
                alert("Hello World!");
            }
        } );
    }
    return config;
}
```

Inside initActions function you can also hide some default actions or add keyboard shortcuts
```javascript
function(config) {
    config.initActions = function( actions ) {
        actions.hide("show-aggregate-dialog");
        actions.lookup("show-filter-dialog").shortcut = "Ctrl+Alt+F";
        actions.update("show-filter-dialog");
        actions.lookup("save").shortcut = "Ctrl+Alt+S";
        actions.update("save");
    }
    return config;
}
```
