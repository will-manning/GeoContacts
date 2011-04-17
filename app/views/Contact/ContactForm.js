/**
 * @class Contacts.views.ContactForm
 * @extends Ext.FormPanel
 * A FormPanel for creating a new Contact
 */
Contacts.views.ContactForm = Ext.extend(Ext.form.FormPanel, {
    initComponent: function() {
        this.items = [{
        	
            /* 
             * a field set nicely ties out fields together
             */  	
            xtype: 'fieldset',
            instructions: 'Fill in at least a first and last name',
            defaults: {
                labelWidth: '40%'
            },
            items: [{
                xtype: 'textfield',
                label: 'First Name',
                name: 'firstName',
                required: true
            }, {
                xtype: 'textfield',
                label: 'Last Name',
                name: 'lastName',
                required: true
            }, {
                xtype: 'textfield',
                label: 'Email',
                name: 'email'
            },{
                xtype: 'textfield',
                label: 'Address line 1',
                name: 'address1',
                required: true
            },{
                xtype: 'textfield',
                label: 'Address line 2',
                name: 'address2',
                required: true
            },{
                xtype: 'textfield',
                label: 'City',
                name: 'city',
                required: true
            }]
        }];
        
        /*
         * go back to the list after saving or canceling
         */
        this.dockedItems = {
            dock: 'top',
            xtype: 'toolbar',
            ui: 'light',
            items: [{
                text: 'Cancel',
                ui: 'back',
                id: 'cancelButton'
            }, {xtype: 'spacer'}, {
                text: 'Done',
                ui: 'action',
                id: 'doneButton'
            }]
        }; 
        
        Contacts.views.ContactForm.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('contact-form', Contacts.views.ContactForm);