# Oracle APEX Interactive Grid Cheat Sheet
This Cheat Sheet is a collection of blog/forum posts related to APEX Grid from version 5.1.*

## Oracle Documentation
From APEX 18.2 there's Interactive Grid documentation available on https://docs.oracle.com/database/apex-18.2/AEXJS/interactiveGrid.html




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

[Some minor new things in APEX 18.2](http://hardlikesoftware.com/weblog/2018/09/28/some-minor-new-things-in-apex-18-2/)

## Other Links
[Interactive Grid: Download as PDF with jsPDF by MENNO HOOGENDIJK](https://t.co/RtXQgxbQSg)

[Pimp my Grid App - IG Sample App](https://apex.oracle.com/pls/apex/f?p=pimpmygrid)

[How to Fix Blank Toolbar DIV](https://apexbyg.blogspot.com/2017/12/interactive-grid-how-to-fix-blank.html)

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

### More About Selecting Grid Rows
https://community.oracle.com/thread/4030402

### Interactive Grid with more than one table
https://community.oracle.com/message/14473170#14473170

### How to validate IG column values on page load
https://community.oracle.com/thread/4068205

## How To's

- [Pagination How To's](ig_pagination.md)


## Get Widget
Before APEX 18.1 you should use:
``` javascript
apex.region("emp").widget().interactiveGrid
```
instead of 
``` javascript
apex.region("emp").call
```


### Get Record
``` javascript
var grid    = apex.region('emp').call('getViews','grid'); 
var model   = grid.model; 
var record  = model.getRecord(vRecordId);
```

### Get Grid Options
``` javascript
apex.region("emp").call("option","config")
```

### Get Model Options
``` javascript
apex.region("emp").call("getViews").grid.model.getOption("fields");
```
For possible options look at model.js defaultOptions object

### Get Selected Records
From the model:
``` javascript
apex.region("emp").call("getViews","grid").view$.grid("getSelectedRecords")  
```

Selected DOM elements
``` javascript
apex.region("emp").call("getViews","grid").view$.grid("getSelection")  
```

### Check Edit Mode
To check if IG is in edit mode use this:
``` javascript
apex.region("emp").call("getActions").get("edit")
``` 

### Set Column Value
``` javascript
var grid        = apex.region('emp').call('getViews','grid');  
var model       = grid.model; 
var record      = model.getRecord(vRecordId);
model.setValue(record,'ENAME', vEname);
```

### Refresh Selected Rows (for Editable IG)
``` javascript
apex.region("emp").call("getActions").invoke("selection-refresh")
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

###  Hide Toolbar Search Bar Field
``` javascript
function(config) {
    if (!config.toolbar) {
        config.toolbar = {};
    }
    config.toolbar.searchField = false;
    return config;
}
```

###  Hide Toolbar Action Menu
``` javascript
function(config) {
    if (!config.toolbar) {
        config.toolbar = {};
    }
    config.toolbar.actionMenu = false;
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
or (from 5.1.1):
```javascript
function(config) {
    config.defaultGridViewOptions = {
        reorderColumns: false
    }
    return config;
}
```

By using this property you can still reorder columns by using keyboard or Columns dialog (tested in 5.1.2.00.09) - known [Bug 26415403](https://support.oracle.com/epmos/faces/BugDisplay?_afrLoop=53048377940059&id=26415403&_afrWindowMode=0&_adf.ctrl-state=j4iheo2nj_4). Demo is available [here](https://apex.oracle.com/pls/apex/f?p=100309:38).

### Disable Column Resize
```javascript
function(config) {
    config.defaultGridViewOptions = {
        resizeColumns: false
    }
    return config;
}
```

### Actions
To list actions call:
``` javascript
apex.region("emp").call("getActions").list().forEach(function(a) { console.log("Action Label: " + a.label + ", Name: " + a.name + (a.choice !== undefined ? ", Choice: " + a.choice : "") ); });
```

To call action use:
apex.region("emp").call("getActions").invoke("show-sort-dialog");

### Adding Row Actions
``` javascript
apex.region("emp")
    .call("getViews").grid
    .rowActionMenu$.menu("option")
    .items.push({type:"action", label:"Hi", action: function(){alert("Hi")}});
```

More on [John's blog](http://hardlikesoftware.com/weblog/2017/01/24/how-to-hack-apex-interactive-grid-part-2/)

To add custom row action to specific position in row action menu use this JS code (only change second if statement) and add it to the Function and Global Variable Declaration page property:
``` javascript
$(function() {
  $("#emp").on("interactivegridviewchange", function(event, data) {
    if ( data.view === "grid" && data.created ) {
      var view$ = apex.region("emp").call("getViews", "grid");
      if (view$.rowActionMenu$){
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

### Hide Grid Footer
``` javascript
function(config) {  
    config.defaultGridViewOptions = {  
        footer: false  
    };  
    return config;   
}  
```

There are also options for other grid views (defaultIconViewOptions, defaultIconViewOptions, defaultDetailViewOptions).

### Row Selector Properties
Declarative properties override config properties. To enable config properties, delete Row Selector column.
Possible properties are multiple and selectAll:
``` javascript
function(config) {
    config.defaultGridViewOptions = {
        multiple: true,
        selectAll: true    
    }
    return config; 
}
```

You can set rowHeader to sequence to display rownumbers instead of selector:
``` javascript
function(config) {
    config.defaultGridViewOptions = {
        rowHeader: 'sequence'
    }
    return config; 
}
```

### Cancel changes and refresh grid
``` javascript
var view = apex.region("emp").call("getCurrentView");

if ( view.internalIdentifier === "grid" ) { // only grid supports editing
    view.model.clearChanges();
}
apex.region("emp").refresh();
```

### Focus IG
``` javascript
apex.region("regionStaticID").focus();
```

### Disable Button based on current row's column value

It's important to set Static ID property of the button (in this example it's btnSubmit)

``` javascript
var vModel = this.data.model;
var vRecord = this.data.selectedRecords[0];
if(vRecord){
  vColValue = vModel.getValue(vRecord, 'JOB');
  if(vColValue=='MANAGER'){
    apex.item('btnSubmit').disable();
  }else{    
    apex.item('btnSubmit').enable();    
  }
}
```

Demo is available [here](https://apex.oracle.com/pls/apex/f?p=100309:60).


## Hide Add Row Button on empty detail IG

- Create Selection Change DA on detail region (in this example with static ID emp) and add true action Execute JavaScript Code:
``` javascript
if (this.data.model.getTotalRecords()==0){
  $('#emp button[data-action=selection-add-row]').hide()
}else{
  $('#emp button[data-action=selection-add-row]').show()
}
```
Check if attribute "Add Row If Empty" is switched off.



## Interactive Grid Events

* interactivegridviewmodelcreate

  explanation and example here

* interactivegridviewchange
* interactivegridcreate
* interactivegridreportsettingschange
* interactivegridselectionchange
* interactivegridsave

  Fires after the save event of the IG has finished. Similar to the "afterrefresh" event of an Interactive Report. You can use this as a Custom Event in a Dynamic Action.
  
## Column Configuration

### Disable header activation
From version 5.1.1 it's possible to disable column header menu:
```javascript
function(config) {
    config.defaultGridColumnOptions = {
        noHeaderActivate: true
    };  
    return config;
}
```

The noHeaderActivate option still allows resize, reordering and sorting of columns.

Also, it's possible to disable specific feature:
```javascript
function(config) {
    // create 'features' object if it does not exist
    config.features = config.features || {};
    config.features.sort = false;
    config.features.aggregate = false;
    return config;
}
```



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

### 5.1.4
[Adding toolbar buttons to more than one IG on page](https://community.oracle.com/thread/4128361)
