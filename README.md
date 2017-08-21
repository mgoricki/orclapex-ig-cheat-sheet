# Oracle APEX Interactive Grid Cheat Sheet
This Cheat Sheet is a collection of blog/forum posts related to APEX Grid from version 5.1.*

## Blog Posts

### John Snyders (Oracle APEX dev team)

[Interactive Grid: Under the Hood](http://hardlikesoftware.com/weblog/2016/06/08/interactive-grid-under-the-hood/)

[Interactive Grid column widths](http://hardlikesoftware.com/weblog/2017/01/06/interactive-grid-column-widths/)

[How to hack APEX Interactive Grid Part 1](http://hardlikesoftware.com/weblog/2017/01/18/how-to-hack-apex-interactive-grid-part-1/)

[How to hack APEX Interactive Grid Part 2](http://hardlikesoftware.com/weblog/2017/01/24/how-to-hack-apex-interactive-grid-part-2/)

[How to hack APEX Interactive Grid Part 3](http://hardlikesoftware.com/weblog/2017/02/20/how-to-hack-apex-interactive-grid-part-3/)

[APEX Interactive Grid API Improvements in 5.1.1](http://hardlikesoftware.com/weblog/2017/03/28/apex-interactive-grid-api-improvements-in-5-1-1/)

[How to hack APEX Interactive Grid Part 4](http://hardlikesoftware.com/weblog/2017/03/31/how-to-hack-apex-interactive-grid-part-4/)

[APEX Client-Side Validation](http://hardlikesoftware.com/weblog/2017/05/10/apex-client-side-validation/)

[APEX Interactive Grid Cookbook](http://hardlikesoftware.com/weblog/2017/07/10/apex-interactive-grid-cookbook/)

## OTN
### Hidden and display columns
[How to set value of a hidden column](https://community.oracle.com/thread/4035826)

[How to set value of a display column](https://community.oracle.com/thread/4047278)

### Processing
[Process Selected Rows](https://community.oracle.com/message/14204014)

### Disabled Cells
[Disable Column Actions](https://community.oracle.com/thread/4030370)
[How to validate disable cell in interactive grid?](https://community.oracle.com/thread/4018344)

### Readonly Cells
[Making Columns Readonly](http://lschilde.blogspot.hr/2017/03/apex-51-interactive-grid-making-columns.html?m=1)

### Disable Column Resize, Sort, Reorder Columns
The noHeaderActivate option still allows resize, reordering and sorting columns. In 5.1.1 you can disable those features with the Advanced JavaScript Code the config options are
config.views.grid.features: resizeColumns, reorderColumns, sort

### Interactive Report vs Interactive Grid
https://community.oracle.com/thread/4049804

### Horizontal Scroll
https://community.oracle.com/thread/4050640
https://community.oracle.com/thread/3812273

### Interactive grid color based on a value
https://community.oracle.com/thread/4047292

### Grid Selection (copy to clipboard)
https://community.oracle.com/thread/4051443

### Highlight Row/Cell
https://community.oracle.com/thread/4036606

### Set Selected Rows After Refresh
https://community.oracle.com/thread/4060416

### Interactive Grid with more than one table
https://community.oracle.com/message/14473170#14473170

### How to validate IG column values on page load
https://community.oracle.com/thread/4068205

## How To's

### Get Record
``` javascript
var widget      = apex.region('emp').widget();
var grid        = widget.interactiveGrid('getViews','grid');  
var model       = grid.model; 
var record      = model.getRecord(vRecordId);
```

### Get Grid Options
``` javascript
apex.region("emp").widget().interactiveGrid("option","config")
```

### Get Model Options
``` javascript
apex.region("emp").widget().interactiveGrid("getViews").grid.model.getOption("fields");
```
For possible options look at model.js defaultOptions object

### Get Selected Records
From the model:
``` javascript
apex.region("emp").widget().interactiveGrid("getViews","grid").view$.grid("getSelectedRecords")  
```

Selected DOM elements
``` javascript
apex.region("emp").widget().interactiveGrid("getViews","grid").view$.grid("getSelection")  
```

### Set Column Value
``` javascript
var widget      = apex.region('emp').widget();
var grid        = widget.interactiveGrid('getViews','grid');  
var model       = grid.model; 
var record      = model.getRecord(vRecordId);
model.setValue(record,'ENAME', vEname);
```

### Refresh Selected Rows (for Editable IG)
``` javascript
apex.region("emp").widget().interactiveGrid("getActions").invoke("selection-refresh")
```
For non-editable IG look at
http://roelhartman.blogspot.hr/2017/07/refresh-selected-rows-in-interactive.html

### Refresh IG on tab activation
1) Add static ID (for example tabs) to the tabs region.
2) Add to page attribute execute when page loads:
``` javascript
$("#tabs").on("atabsactivate", function(event, ui) {
    if (ui.showing) {
        ui.active.panel$.find(".a-GV").grid("refresh");
    }
});
```

### Refresh IG on Region Display Selector activation
``` javascript
$('.apex-rds').data('onRegionChange', function(mode, activeTab) {  
  if (activeTab.href != "#SHOW_ALL"){  
    apex.region(activeTab.href.replace("#","")).refresh();  
  }  
});
```

###  Hide Search Bar Field
``` javascript
function(config) {
    if (!config.toolbar) {
        config.toolbar = {};
    }
    config.toolbar.searchField = false;
    return config;
}
```

In 5.1.2.00.09 there's a bug [Bug 26403439](https://support.oracle.com/epmos/faces/BugDisplay?_afrLoop=531782899244749&id=26403439&_afrWindowMode=0&_adf.ctrl-state=p2g8xzuiu_49). Workaround available [here](https://community.oracle.com/thread/4060926).

### Disable Column Reorder
``` javascript
function (config){
  config.views.grid.features.reorderColumns = false;
  return config;
}
```

By using this property you can still reorder columns by using keyboard or Columns dialog (tested in 5.1.2.00.09) - known [Bug 26415403](https://support.oracle.com/epmos/faces/BugDisplay?_afrLoop=53048377940059&id=26415403&_afrWindowMode=0&_adf.ctrl-state=j4iheo2nj_4). Demo is available [here](https://apex.oracle.com/pls/apex/f?p=100309:38).

### Actions
To list actions call:
``` javascript
apex.region("emp").widget().interactiveGrid("getActions").list().forEach(function(a) { console.log("Action Label: " + a.label + ", Name: " + a.name + (a.choice !== undefined ? ", Choice: " + a.choice : "") ); });
```

To call action use:
apex.region("emp").widget().interactiveGrid("getActions").invoke("show-sort-dialog");

### Adding Row Actions
``` javascript
apex.region("emp").widget()
    .interactiveGrid("getViews").grid
    .rowActionMenu$.menu("option")
    .items.push({type:"action", label:"Hi", action: function(){alert("Hi")}});
```

More on [John's blog](http://hardlikesoftware.com/weblog/2017/01/24/how-to-hack-apex-interactive-grid-part-2/)

To add custom row action to specific position in row action menu use this (only change second if statement):
``` javascript
$(function() {
  $("#emp").on("interactivegridviewchange", function(event, data) {
    if ( data.view === "grid" && data.created ) {
      var view$ = apex.region("emp").widget().interactiveGrid("getViews", "grid");
      var menu$ = view$.rowActionMenu$.menu("option").items;          
      for (i = 0; i < menu$.length; i++ ) {
        if (menu$[i].action === 'row-duplicate'){
          menu$.splice(i+1
                     , 0
                     , {
                        type:"action",
                        label:"After Copy Action",
                        icon: "fa fa-user",
                        action: function(menu, element) {
                          var record = view$.getContextRecord( element )[0];
                          alert('After copy action: '+view$.model.getValue(record, "EMPNO"));
                        }
                       })
          break;
        }
      }
    }        
  });
}); 
```

Demo is available [here](https://apex.oracle.com/pls/apex/f?p=100309:41) 

### Removing Row Actions
``` javascript
function(config) {  
  config.initActions = function( actions ) {  
    actions.remove("row-duplicate");  
  };  
  return config;  
}  
```

To list all action names see Actions paragraph above.
More on [OTN](https://community.oracle.com/message/14320776#14320776)

### Persistant Row Selection
``` javascript
function(config) {  
    config.defaultGridViewOptions = {  
        persistSelection: true  
    };  
    return config;
} 
```

### Auto Add Row
How to turn off auto add row feature:
``` javascript
function(config) {  
    config.editable.autoAddRow = false;
    return config;
} 
```

### Interactive Grid Events
* interactivegridviewmodelcreate

  explanation and example here

* interactivegridviewchange
* interactivegridcreate
* interactivegridreportsettingschange
* interactivegridselectionchange
* interactivegridsave

  Fires after the save event of the IG has finished. Similar to the "afterrefresh" event of an Interactive Report. You can use this as a Custom Event in a Dynamic Action.


## Bugs
### 5.1.2.00.09

Bug 26147254 - Duplicated private reports - [Details from OTN](https://community.oracle.com/thread/4047778)

[Bug 26403861](https://support.oracle.com/epmos/faces/BugDisplay?_afrLoop=531233910888612&id=26403861&_afrWindowMode=0&_adf.ctrl-state=p2g8xzuiu_4) - Detail IG region is not refreshed if not visible (in tab) - [Details from OTN](https://community.oracle.com/thread/4034432)

[Bug 26403439](https://support.oracle.com/epmos/faces/BugDisplay?_afrLoop=531782899244749&id=26403439&_afrWindowMode=0&_adf.ctrl-state=p2g8xzuiu_49) - INTERACTIVE GRID SETTING TOOLBAR.SEARCHFIELD = FALSE DOES NOT HIDE SEARCH INPUT - [Details from OTN](https://community.oracle.com/thread/4060926)

[Bug 26415403](https://support.oracle.com/epmos/faces/BugDisplay?_afrLoop=53048377940059&id=26415403&_afrWindowMode=0&_adf.ctrl-state=j4iheo2nj_4) - INTERACTIVE GRID SETTING VIEWS.GRID.FEATURES.REORDERCOLUMNS=FALSE DOES NOT WORK [Details from OTN](https://community.oracle.com/thread/4061833)

### 5.1.1 
[gotoCell function](https://community.oracle.com/thread/4050038)

[#25974131 Error on Save - no data found for .](https://community.oracle.com/thread/4041014)

[IG Required Pop-up LOV issue](https://community.oracle.com/thread/4052088)

[IG Problems by Peter Raganitsch](https://community.oracle.com/thread/4032141)

[Interactive grid 5.1.1.00.08 issues](https://community.oracle.com/thread/4030751)
