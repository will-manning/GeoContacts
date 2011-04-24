/**
 * @class Contacts.views.ContactDetails
 * @extends Ext.Panel A Panel showing the details of a contact.
 */
Contacts.views.ContactDetails = Ext
		.extend(
				Ext.Panel,
				{
					tpl : '<h2>{firstName} {lastName}</h2><p><a href="mailto:{email}">{email}</a></p><p>Address line 1: {address1}</p><p>Address line 2: {address2}</p><p>city: {city}</p>',
					
					// style the above html
					styleHtmlContent : true,

					layout : 'fit',
					
					initComponent : function() {
						// a back button to go back to the list
						this.dockedItems = {
							dock : 'top',
							xtype : 'toolbar',
							items : [ {
								text : 'Back',
								ui : 'back',
								id : 'backButton'
							}, {
								text : 'Edit',
								ui : 'action',
								id : 'editButton'
							}, {
								text : 'Map',
								ui : 'action',
								id : 'mapButton'

							}]
						};

						Contacts.views.ContactDetails.superclass.initComponent
								.apply(this, arguments);
					}
				});

Ext.reg('contact-details', Contacts.views.ContactDetails);