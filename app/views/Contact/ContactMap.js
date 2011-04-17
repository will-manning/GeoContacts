/**
 * @class Contacts.views.ContactForm
 * @extends Ext.FormPanel
 * A FormPanel for creating a new Contact
 */
Contacts.views.ContactMap = Ext.extend(Ext.form.FormPanel, {
	
	
	
    initComponent: function() {
    	
    	/*defien teh map to be added to the panel*/
    	this.map = new Ext.Map( {        	
            /* 
             * a field set nicely ties out fields together
             */       	
    		xtype : 'map',
    		listeners : {
    		// always destroy to preserve memory
    		deactivate : function(map) {
    				map.destroy();
    		}
    	}});
    	
        this.items = [this.map];
        
        /*
         * go back to the list after saving or canceling
         */
        this.dockedItems = {
            dock: 'top',
            xtype: 'toolbar',
            ui: 'light',
            items: [{
                text: 'Back',
                ui: 'back',
                id: 'cancelButton'
            },{
                text: 'Directions',
                ui: 'action',
                id: 'dirButton'
            }]
        }; 
        
        Contacts.views.ContactMap.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('contact-map', Contacts.views.ContactMap);