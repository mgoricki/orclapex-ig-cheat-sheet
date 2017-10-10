apex.region('emp').widget().interactiveGrid('getToolbar');

/**
* Call this method when the size of the widget element changes. This can happen if the browser window
* changes for example. This will resize the current view.
* Note: Most of the time it is not necessary to call this method as Interactive Grid detects when its
* size changes.
*/
apex.region('emp').widget().interactiveGrid('resize');

/**
* Cause the Interactive Grid to get fresh data from the server.
* A warning is given if the model has any outstanding changes and the user can choose to allow the refresh or not.
*
* @param {Object} [pOptions] tbd/todo
*/
apex.region('emp').widget().interactiveGrid('refresh');
apex.region('emp').refresh();


/**
* Put focus in the cell (or field etc.) given by pRecordId and pColumn. This is used to focus rows or cells
* that have errors. This will switch to the "editable" view.
* This delegates to the view. Not all views will support going to a cell.
*
* @param {String} [pModelInstanceId] model instance id. only needed if using multiple models such as in master
*                                  detail and the model has not already been set correctly by the master.
* @param {String} pRecordId the record id of the row to go to.
* @param {String} [pColumn] column in the record row to go to.
*/
apex.region('emp').widget().interactiveGrid('gotoCell');


/**
* Returns the actions context for this Interactive Grid instance
* @return {apex.actions} the actions context
* @example
*     apex.region("emp").widget().interactiveGrid("getActions").invoke("save");
*/
apex.region('emp').widget().interactiveGrid('getActions');


/**
* Returns the toolbar widget element.
*
* @return {jQuery} jQuery object of the interactive grid toolbar or null if there is no toolbar
*/
apex.region('emp').widget().interactiveGrid('getToolbar');

/**
 * Return the underlying data model records corresponding to the current selection in the current view.
 * Use the apex.model API to manipulate these records. Make sure you are using the model for the current
 * view for example: apex.region(<static-id>).widget().interactiveGrid("getCurrentView").model
 *
 * Note: Depending on the view and the submitSelectedRows option the selected records returned could
 * span multiple pages. To get just the records that are selected in the current page requires
 * using view widget specific methods.
 *
 * @return {Array} array of records from the model corresponding to the selected rows/records
 * Returns empty array if there is no selection. Returns null if the current view doesn't support
 * selection.
 */
apex.region('emp').widget().interactiveGrid('getSelectedRecords');

/**
 * Set the current selection to the records specified. Only applies for views that support selection.
 *
 * Note that the records or record ids given may not yet exist in the model or may not be visible in the view.
 *
 * @param [array] pRecords an array of model records or an array of model record ids as returned by model
 *                  getRecordId. If this is an empty array then the selection is cleared.
 */
apex.region('emp').widget().interactiveGrid('setSelectedRecords');

/**
 * Return the Interactive Grid view interface for the given view id or if not view id is given return a
 * map of all the view interfaces.
 *
 * @param {string} [pViewId] Id of the view to get. For example "grid" or "chart".
 * @return {object} View interface.
 */
apex.region('emp').widget().interactiveGrid('getViews');
apex.region('emp').widget().interactiveGrid('getCurrentView');
apex.region('emp').widget().interactiveGrid('getCurrentViewId');

/**
* Sets focus to the search field if present, and if not delegates to the current view's focus handling.
*/
apex.region('emp').widget().interactiveGrid('focus');
