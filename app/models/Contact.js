/**
 * @class Contact
 * @extends Ext.data.Model
 * 
 * The contact model
 * 
 */
Ext.regModel("Contact", {
    fields: [
        {name: "id",    type: "int"},
        {name: "firstName", type: "string"},
        {name: "lastName", type: "string"},
        {name: "email", type: "email"},
        {name: "address1", type: "string"},
        {name: "address2", type: "string"},
        {name: "city", type: "string"}
    ],
    
    validations: [
                  {
                	  type: 'presence', name: 'firstName', message:'First Name is required'
                  },
                  {
                	  type: 'presence', name: 'lastName', message:'Last Name is required'
                  },
                  {
                	  type: 'presence', name: 'email', message:'Email is required'
                  },
                  {
                	  type: 'presence', name: 'address1', message:'Address 1 is required'
                  },
                  {
                	  type: 'presence', name: 'address2', message:'Address 2 is required'
                  },
                  {
                	  type: 'presence', name: 'city', message:'City is required'
                  },],
    
    proxy: {
    	type: 'localstorage',
    	id: 'contacts'
    }
});