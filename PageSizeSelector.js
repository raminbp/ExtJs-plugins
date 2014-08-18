/**
 *
 * @author Ramin Bakhshpour (ramin.bp@gmail.com)
 * @class Ext.ux.pageSizeSelector
 * @extends Ext.AbstractPlugin
 */
Ext.define('Ext.ux.pageSizeSelector', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.pagesizeselector',

    pageSizeArray: [10, 15, 25, 50],
    defaultSize: 10,
    width: 150,
    labelWidth: 60,
    fieldLabel: 'Page size',

    /**
     *
     * @param parent
     */
    init: function (parent) {
        "use strict";
        this.parent = parent;
        parent.on('render', this.onParentRender, this);
        parent.getStore().pageSize = this.defaultSize;
    },

    /**
     *
     * @param parent
     */
    onParentRender: function (parent) {
        "use strict";
        var refreshIndex = parent.items.indexOfKey('refresh');
        parent.insert(refreshIndex + 1, {xtype: 'tbseparator'});
        parent.insert(refreshIndex + 2, {
            xtype: 'combo',
            displayField: 'pageSize',
            valueField: 'pageSize',
            editable: false,
            value: this.defaultSize,
            width: this.width,
            labelWidth: this.labelWidth,
            fieldLabel: this.fieldLabel,
            store: {
                type: 'array',
                fields: ['pageSize'],
                data: Ext.Array.map(this.pageSizeArray, function (item) { return Ext.Array.from(item)})
            },
            listeners: {
                select: this.onSelectPageSize,
                scope: this
            }
        });
    },

    /**
     *
     * @param combo
     * @param record
     */
    onSelectPageSize: function (combo, record) {
        "use strict";
        var store = this.parent.store;
        store.pageSize = record[0].get('pageSize');
        store.loadPage(1);
    }
});