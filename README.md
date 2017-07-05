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

## How To's

### Get Record
```javascript
var widget      = apex.region('emp').widget();
var grid        = widget.interactiveGrid('getViews','grid');  
var model       = grid.model; 
var record      = model.getRecord(vRecordId);
```

### Set Column Value
```javascript
var widget      = apex.region('emp').widget();
var grid        = widget.interactiveGrid('getViews','grid');  
var model       = grid.model; 
var record      = model.getRecord(vRecordId);
model.setValue(record,'ENAME', vEname);
```

## Bugs
### 5.1.1 
[gotoCell function](https://community.oracle.com/thread/4050038)

[#25974131 Error on Save - no data found for .](https://community.oracle.com/thread/4041014)

[IG Required Pop-up LOV issue](https://community.oracle.com/thread/4052088)

[IG Problems by Peter Raganitsch](https://community.oracle.com/thread/4032141)

[Interactive grid 5.1.1.00.08 issues](https://community.oracle.com/thread/4030751)
