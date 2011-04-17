/**
 * @class Contacts.views.ContactListPanel
 * @extends Ext.Panel
 * The panel containing our contact list.
 */
Contacts.views.ContactListPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',

	initComponent : function() {
		//bind to the contacts store
		this.store = Ext.getStore('Contacts');

		/*set up a toolbar at the top of teh page
		*allows user to add contacts
		*
		*itemID (which doesn't have to be unique) allows
		*you to use css style lookups to grab this comp
		**/
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'top',
			title : 'Contacts',
			items : [ {
				xtype : 'spacer'
			}, {
				id : 'addButton',
				iconCls : 'add',
				iconMask : true,
				ui: 'action',
				handler : this.onAddTap,
				scope : this
			} ]
		} ];

		/*
		 * set up a list bound to our store and tell it it's grouped
		 */
		this.list = new Ext.List({
			itemTpl : '{firstName} <strong>{lastName}</strong>',
			store : this.store,
			grouped : true,
			indexBar : true
		});

		//add the list to the panel
		this.items = [ this.list ];

		Contacts.views.ContactListPanel.superclass.initComponent.apply(this,
				arguments);
	}

});

//register the view
Ext.reg('contact-listpanel', Contacts.views.ContactListPanel);