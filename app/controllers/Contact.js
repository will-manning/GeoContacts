/**
 * @class Contact
 * @extends Ext.Controller
 * 
 * 
 * 
 */
Ext.regController("Contact", {
	model : "Contact",

	/**
	 * render the list view
	 */
	index : function() {
		/*
		 * don't want multiple copies if user goes away from index and then
		 * returns so check for existance first
		 */
		if (!this.listPanel) {
			// will render to the default Target set up for the applicatin
			this.listPanel = this.render({
				xtype : 'contact-listpanel',
				listeners : {
					list : {
						// when a user selects a contact slide to the details
						// page
						// by calling the show action
						select : this.show,
						scope : this
					},
					/*
					 * When the page is activated make sure no contacts are
					 * selected, fired after card slide animation too
					 */
					activate : function(listPanel) {
						listPanel.list.getSelectionModel().deselectAll();
					}
				}
			});

			/*
			 * travers the view and finds the add button and adds a listener
			 */
			this.listPanel.query('#addButton')[0].on({
				tap : this.compose,
				scope : this
			});

			// make the listPanel the active item
			Ext.getCmp('viewport').setActiveItem(this.listPanel);
		}
		// if the list already exists
		else {
			// sort the list, as we may have added new
			this.listPanel.store.sort();

			/*
			 * make the lost the active item in the viewport again
			 */
			Ext.getCmp('viewport').setActiveItem(this.listPanel, {
				type : 'slide',
				direction : 'right'
			});
		}
	},

	/**
	 * render the details template
	 * 
	 * @param list
	 * @param record
	 *            the list item that was clicked
	 */
	show : function(list, record) {

		/*
		 * render the details view and pass it the record
		 */
		this.details = this.render({
			xtype : 'contact-details',
			data : record.data || this.details.record.data,
			/*data is deleted after the tpl is rendered so I'm
			storing it again*/
			record : record,
			listeners : {
				deactivate : function(details) {
					details.destroy();
				}
			}
		});

		/*
		 * add a listener to teh back button
		 */
		this.details.query('#backButton')[0].on({
			tap : this.index,
			scope : this
		});

		var that = this;

		/*
		 * add a listener to the map button
		 */
		this.details.query('#mapButton')[0].on({
			tap : function() {
				Ext.dispatch({
					controller : "Contact",
					action : "showLocation",
					record : that.details.record
				});
			},
			scope : that
		});

		/*
		 * slide it in from the left
		 */
		Ext.getCmp('viewport').setActiveItem(this.details, {
			type : 'slide',
			direction : 'left'
		});

	},

	/**
	 * render the form for creating a contact
	 */
	compose : function() {

		this.form = this.render({
			xtype : 'contact-form',
			listeners : {
				// alwasy destroy to preserve memory
				deactivate : function(form) {
					form.destroy();
				}
			}
		});

		this.form.query('#cancelButton')[0].on({
			tap : this.index,
			scope : this
		});

		this.form.query('#doneButton')[0].on({
			tap : this.create,
			scope : this
		});

		// make the form teh active item
		Ext.getCmp('viewport').setActiveItem(this.form, {
			type : 'slide',
			direction : 'left'
		});

	},

	create : function() {
		var model = Ext.ModelMgr.create(this.form.getValues(), 'Contact');

		var errors = model.validate(), message = "";

		if (errors.isValid()) {

			this.listPanel.store.create(this.form.getValues());
			this.index();

		} else {
			Ext.each(errors.items, function(rec, i) {
				message += rec.message + "<br>";
			});
			Ext.Msg.alert("Validate", message, function() {
			});
			return false;
		}

	},

	/**
	 * render the map view with the current contacts address
	 */
	showLocation : function(options) {
		this.map = this.render({
			xtype : 'contact-map',
			listeners : {
				// always destroy to preserve memory
				deactivate : function(map) {
					map.destroy();
				}
			}
		});

		var address = options.record.data.address1 + ", "
				+ options.record.data.address2 + ", "
				+ options.record.data.city;

		//get the geogle JS APIs geocoder
		var geocoder = new google.maps.Geocoder();

		var that = this;

		/*get a gecode (lat/long) for the current address and mark it on the map*/
		geocoder.geocode({
			'address' : address
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				that.map.map.update(results[0].geometry.location);
				that.map.position = results[0].geometry.location;
				var marker = new google.maps.Marker({
					position : results[0].geometry.location,
					map : that.map.map.map
				});

			} else {
				alert("Geocode was not successful for the following reason: "
						+ status);
			}
		});

		// make the map the active item
		Ext.getCmp('viewport').setActiveItem(this.map, {
			type : 'slide',
			direction : 'left'
		});

		/*
		 * travers the view and finds the add button and adds a listener
		 */
		this.map.query('#cancelButton')[0].on({
			tap : this.show,
			scope : this,

			data : options.record.data

		});	
		

		/*
		 * travers the view and finds the add button and adds a listener
		 */
		this.map.query('#dirButton')[0].on({
			tap : this.directions,
			scope : that,
			map: this.map
		});
	},

	/**
	 * Use w3c geolocation to get the users current location then provide directions from there
	 */
	directions : function() {
		
		var that = this;
		
		if (navigator.geolocation) {
			//the success function
			navigator.geolocation.getCurrentPosition(function(pos) {
				
				var directionsService = new google.maps.DirectionsService();
				var directionsDisplay = new google.maps.DirectionsRenderer();
				
				directionsDisplay.setMap(that.map.map.map);
				
				var request = {
				        origin:pos.coords.latitude+", "+pos.coords.longitude, 
				        destination: that.map.position.Da+", "+that.map.position.Ea,
				        travelMode: google.maps.DirectionsTravelMode.DRIVING
				    };
				
				directionsService.route(request, function(response, status) {
				      if (status == google.maps.DirectionsStatus.OK) {
				        directionsDisplay.setDirections(response);
				      }
				    });
			},
			function() {
			});
		} else {
			alert("Can't obtain your position");
		}

	}
});
