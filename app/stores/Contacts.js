Ext.regStore('Contacts', {
    model: 'Contact',
    autoLoad: true,
    //sort by last name
    sorters: ['lastName'],
    //group by the first letter of the last name 
    getGroupString: function(record){
    	return record.get('lastName')[0];
    }
    
});