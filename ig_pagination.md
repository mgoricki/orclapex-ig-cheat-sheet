# Pagination How To's

Before APEX 18.1 you should use:
``` javascript
apex.region("emp").widget().interactiveGrid
```
instead of 
``` javascript
apex.region("emp").call
```

Demo is available [here](https://apex.oracle.com/pls/apex/f?p=59127:30:114522178173858::NO:::).

## Get Rows Per Page
``` javascript
apex.region("emp").call("getViews").grid.view$.data("apex-grid").pageSize;
apex.region("emp").call("getActions").get("change-rows-per-page");
apex.region("emp").call("getViews").grid.view$.grid('option','rowsPerPage');
```

## Set Rows Per Page
``` javascript
apex.region("emp").call("getActions").set("change-rows-per-page", 10)
```

## Get Total Rows
``` javascript
apex.region("emp").call("getViews").grid.model.getTotalRecords();
```

## Go To Page
``` javascript
apex.region("emp").call("getViews").grid.view$.grid('gotoPage',2);
```

## Next/Previous/First/Last Page
``` javascript
// First Page
apex.region("emp").call("getViews").grid.view$.grid('firstPage');

// Last Page
apex.region("emp").call("getViews").grid.view$.grid('lastPage');


// Previous Page
apex.region("emp").call("getViews").grid.view$.grid('previousPage');

// Next Page
apex.region("emp").call("getViews").grid.view$.grid('nextPage');

// Go To Page (it's zero based - 0 goes to page 1)
apex.region("emp").call("getViews").grid.view$.grid('gotoPage',0);

// Get Current Page
var gridData = apex.region("emp").call("getViews").grid.view$.data("apex-grid");
var currentPage = Math.floor(gridData.pageOffset / gridData.pageSize) + 1;
```

## Get Current Page
``` javascript
var gridData = apex.region("emp").call("getViews").grid.view$.data("apex-grid");
var currentPage = Math.floor(gridData.pageOffset / gridData.pageSize) + 1;
console.log(currentPage);
```