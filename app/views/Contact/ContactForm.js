/**
 * @class Contacts.views.ContactForm
 * @extends Ext.FormPanel
 * A FormPanel for creating a new Contact
 */
Contacts.views.ContactForm = Ext.extend(Ext.form.FormPanel, {	

	initComponent : function() {
		this.items = [ {

			/* 
			 * a field set nicely ties out fields together
			 */
			xtype : 'fieldset',
			instructions : '* denotes a required field',
			defaults : {
				labelWidth : '40%'
			},
			items : [ {
				xtype : 'textfield',
				label : 'First Name',
				name : 'firstName',
				id : 'firstName',	
				required : true
			}, {
				xtype : 'textfield',
				label : 'Last Name',
				name : 'lastName',
				id : 'lastName',
				required : true
			}, {
				xtype : 'textfield',
				label : 'Email',
				name : 'email',
				id : 'email'
			}, {
				xtype : 'textfield',
				label : 'Address line 1',
				name : 'address1',
				id : 'address1',
				required : true
			}, {
				xtype : 'textfield',
				label : 'Address line 2',
				name : 'address2',
				id : 'address2',
				required : true
			}, {
				xtype : 'textfield',
				label : 'City',
				name : 'city',
				id : 'city'
			}]
		} ];		

		/*
		 * go back to the list after saving or canceling
		 */
		this.dockedItems = {
			dock : 'top',
			xtype : 'toolbar',
			ui : 'light',
			items : [ {
				text : 'Cancel',
				ui : 'back',
				id : 'cancelButton'
			}, {
				xtype : 'spacer'
			}, {
				text : 'Done',
				ui : 'action',
				id : 'doneButton'
			} ]
		};

		Contacts.views.ContactForm.superclass.initComponent.apply(this,
				arguments);
	}
});

Ext.reg('contact-form', Contacts.views.ContactForm);