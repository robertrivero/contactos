sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";
    
    var ListController = Controller.extend("contactos.controller.View1", {

		onInit :  function (evt) {

	
            var oModel = this.getView().getModel("users");
			console.log(oModel);
			this.getView().setModel(oModel);

		},

		onPopinLayoutChanged: function() {
			var oTable = this.byId("idProductsTable");
			var oComboBox = this.byId("idPopinLayout");
			var sPopinLayout = oComboBox.getSelectedKey();
			switch (sPopinLayout) {
				case "Block":
					oTable.setPopinLayout(PopinLayout.Block);
					break;
				case "GridLarge":
					oTable.setPopinLayout(PopinLayout.GridLarge);
					break;
				case "GridSmall":
					oTable.setPopinLayout(PopinLayout.GridSmall);
					break;
				default:
					oTable.setPopinLayout(PopinLayout.Block);
					break;
			}
		},

		onSelect: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"),
				sText = oEvent.getSource().getText(),
				oTable = this.byId("contactList"),
				aSticky = oTable.getSticky() || [];

			if (bSelected) {
				aSticky.push(sText);
			} else if (aSticky.length) {
				var iElementIndex = aSticky.indexOf(sText);
				aSticky.splice(iElementIndex, 1);
			}

			oTable.setSticky(aSticky);
		},

		onToggleInfoToolbar: function(oEvent) {
			var oTable = this.byId("idProductsTable");
			oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
		},
		onFilter: function(oEvent){
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			console.log(sQuery);
			if (sQuery) {
				aFilter.push(new Filter("first_name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			const oList = this.byId("contactList");
			const oBinding = oList.getBinding("items");
			console.log(oBinding);
			oBinding.filter(aFilter);
		}
	
	});

	


	return ListController;


    });
