﻿new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        clients: '',
        units: '',
        regions: '',
        aes: '',
        ACTLeads: '',
        users: '',
        soldStatuses: '',
        opportunityName: '',
        opportunityId: null,
        opportunityNotes: '',
        clientContact: '',
        clientId: null,
        addState: false,
        updateState: false,
        moreState: false,
        accountExecutiveUserId: null,
        unitId: null,
        regionId: null,
        soldStatusId: null,
        opportunityOwnerUserId: null,
        lastModifiedUserId: null,
        active: false,
        errors: {}
    },
    watch: {
        opportunityName: function (val) {
            try {
                if (val.length || val) { this.errors.opportunityName = ''; }
                else {
                    this.errors.opportunityName = 'Opportunity Name required';
                }
                if (!this.updateState) {
                    for (let i = 0; i < this.opportunities.length; i++) {
                        if (val == this.opportunities[i].opportunityName) {
                            this.errors.opportunityName = '"' + this.opportunityName + '" already exists.';
                            break;
                        }
                    }
                }
            } catch (e) { }
        },
        clientContact: function (val) {
            try {
                if (val.length || val) { this.errors.clientContact = ''; }
                else { this.errors.clientContact = 'Client Contact required'; }
            } catch (e) { }
        },
        opportunityNotes: function (val) {
            try {
                if (val.length) { this.errors.opportunityNotes = ''; }
                else { this.errors.opportunityNotes = 'Opportunity Notes required'; }
            } catch (e) { }
        },
        clientId: function (val) {
            try {
                if (val || val.length) {
                    this.errors.clientId = '';
                } else { this.errors.clientId = 'Client required'; }
            } catch (e) { }

        },
        accountExecutiveUserId: function (val) {
            try {
                if (val || val.length) { this.errors.accountExecutiveUserId = ''; }
                else { this.errors.accountExecutiveUserId = 'AE required'; }
            } catch (e) { }
            
        },
        unitId: function (val) {
            try {
                if (val || val.length) { this.errors.unitId = ''; }
                else { this.errors.unitId = 'Unit required'; }
            } catch (e) { }
        },
        regionId: function (val) {
            try {
                if (val || val.length) { this.errors.regionId = ''; }
                else { this.errors.regionId = 'Region required'; }
            } catch (e) { }

        },
        soldStatusId: function (val) {
            try {
                if (val || val.length) { this.errors.soldStatusId = ''; }
                else { this.errors.soldStatusId = 'Sold status required'; }
            } catch (e) { }

        },
        opportunityOwnerUserId: function (val) {
            try {
                if (val || val.length) { this.errors.opportunityOwnerUserId = ''; }
                else { this.errors.opportunityOwnerUserId = 'Opportunity Owner required'; }
            } catch (e) { }
        },
    },
    methods: {
        /* Clear out forms */
        clearForm: function () {
            this.opportunityId = null;
            this.addState = false;
            this.updateState = false;
            this.opportunityName = null;
            this.opportunityNotes = null;
            this.clientContact = null;
            this.clientID = null;
            this.accountExecutiveUserId = null;
            this.unitId = null;
            this.regionId = null;
            this.soldStatusId = null;
            this.opportunityOwnerUserId = null;
            this.clientId = null;
            this.active = false;
            this.errors = [];
        },
        onSubmit: function () {
            /* Check to see if updating preexisting Opportunity, or if adding a new one */
            this.checkForm();
            if (!this.errors.length) {
                if (this.updateState) {
                    this.updateOpportunity();
                }
                else if (this.addState) {
                    this.addOpportunity();
                }
            } 
        },
        onEdit: function (opportunity) {
            /* Specify that status is being updated */
            this.opportunityId = opportunity.opportunityId;
            this.updateState = true;
            /* Populate form with selected values */
            this.opportunityName = opportunity.opportunityName;
            this.opporunityName = opportunity.opportunityName;
            this.opportunityNotes = opportunity.opportunityNotes;
            this.clientContact = opportunity.clientContact;
            this.clientId = opportunity.clientId;
            this.accountExecutiveUserId = opportunity.accountExecutiveUserId;
            this.unitId = opportunity.unitId;
            this.regionId = opportunity.regionId;
            this.soldStatusId = opportunity.soldStatusId;
            this.opportunityOwnerUserId = opportunity.opportunityOwnerUserId;
            this.lastModifiedUserId = opportunity.lastModifiedUserId;
            this.active = opportunity.active;
            /* Set form to drop down */
            this.addState = true;
            window.scrollTo(0, 100);
        },
        addOpportunity: function () {
            let data = this.buildJSON();
            $.ajax({
                type: "POST",
                url: "AddOpportunity",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    alert("Added " + this.opportunityName + "!");
                    this.opportunities.push(data);
                    this.clearForm();
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        updateOpportunity: function () {
            let data = this.buildJSON();
            //alert(this.opportunityName + ' updated!');
            this.clearForm();
            $.ajax({
                type: "POST",
                url: "EditPost",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    // alert("Added " + this.opportunityName + "!");
                    this.opportunities.push(data);
                    this.clearForm();
                    /* This code will update the table.  It needs to be in it's own function */
                    $.ajax({
                        async: false,
                        cache: false,
                        type: "GET",
                        url: "GetOpportunities",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            this.opportunities = data;
                            // GET CLIENT LIST
                            $.ajax({
                                async: false,
                                cache: false,
                                type: "GET",
                                url: "GetClientList",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                success: function (data) {
                                    this.clients = data;
                                    // GET UNIT LIST
                                    $.ajax({
                                        async: false,
                                        cache: false,
                                        type: "GET",
                                        url: "GetUnitList",
                                        contentType: "application/json;charset=utf-8",
                                        dataType: "json",
                                        success: function (data) {
                                            this.units = data;
                                        }.bind(this)
                                    });
                                }.bind(this)
                            });
                        }.bind(this)
                    });
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        
        /* This function will return an object based on the current data state on the Vue instance, which can then be seralized to JSON data */
        buildJSON: function () {
            let data = {};
            data.id = this.opportunityId;
            data.opportunityName = this.opportunityName;
            data.opportunityNotes = this.opportunityNotes;
            data.clientContact = this.clientContact;
            data.clientId = this.clientId;
            data.accountExecutiveUserId = this.accountExecutiveUserId;
            data.unitId = this.unitId;
            data.regionId = this.regionId;
            data.soldStatusId = this.soldStatusId;
            data.opportunityOwnerUserId = this.opportunityOwnerUserId;
            data.active = this.active;
            return data;
        },
        /* Form validation method */
        checkForm: function () {
            this.errors = {};

            /*Checks to see if forms are empty */
            if (!this.opportunityName) {
                this.errors.opportunityName = 'Opportunity Name required.';
            } if (!this.clientId) {
                this.errors.clientId = 'Client required.';
            } if (!this.clientContact) {
                this.errors.clientContact = 'Client Contact required.';
            } if (!this.accountExecutiveUserId) {
                this.errors.accountExecutiveUserId = 'Account Executive required.';
            } if (!this.clientId) {
                this.errors.clientId = 'Client required.';
            } if (!this.regionId) {
                this.errors.regionId = 'Region required.';
            } if (!this.soldStatusId) {
                this.errors.soldStatusId = 'Sold Status required.';
            } if (!this.opportunityOwnerUserId) {
                this.errors.opportunityOwnerUserId = 'Opportunity Owner required.';
            } if (!this.opportunityNotes) {
                this.errors.opportunityNotes = 'Opportunity Note required.';
            } if (!this.unitId) {
                this.errors.unitId = 'Unit Id required.';   
            }
            /* Looks for duplicate Opportunity Names - if adding NEW, but not if UPDATING */
            if (!this.updateState) {
                for (let i = 0; i < this.opportunities.length; i++) {
                    if (this.opportunityName == this.opportunities[i]['opportunityName']) {
                        this.errors.push('Opportunity Name: "' + this.opportunityName + '" already exists.')
                        break;
                    }
                }
            }
            if (!this.errors.length) { return true; }
        },
        cancel: function () {
            this.errors = {};
            this.addState = false;
        },
        getClientName: function (clientId) { // pass id and get name back
            for (client in this.clients) {
                if (this.clients[client].ClientId == clientId) {
                    return(this.clients[clientId].ClientName);
                }
            }
        },
        getAEName: function (AEId) { // pass ID and get name back
            for (ae in this.aes) {
                if (this.aes[ae].UserId == AEId) {
                    return (this.aes[ae].FullName);
                }
            }
        },
        getUnitName: function (unitId) {
            for (unit in this.units) {
                if (this.units[unit].UnitId == unitId) {
                    return (this.units[unit].UnitName);
                }
            }
        },
        getLastModifiedUserName: function (id) {
          
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].UserId === this.opportunityDetail.lastModifiedUserId) {
                    return this.users[i].UserFullName;
                }
            }
        },
        getRegionName: function (regionId) {
            for (region in this.regions) {
                if (this.regions[region].RegionId == regionId) {
                    return (this.regions[region].RegionName);
                }
            }
        },
        getSoldStatus: function (soldStatusId) {
            for (soldStatus in this.soldStatuses) {
                if (this.soldStatuses[soldStatus].SoldStatusId == soldStatusId) {
                    return (this.soldStatuses[soldStatus].SoldStatusName);
                }
            }
        },
        getOpportunityName: function (opportunityOwnerUserId) {
            
            for (ACTLead in this.ACTLeads) {
                if (this.ACTLeads[ACTLead].UserId == opportunityOwnerUserId) {
                    return (this.ACTLeads[ACTLead].FullName);
                }
            }
        },
        displayDetail: function (opportunity) {
            this.opportunityDetail = opportunity;
            /* Produces a human readable string for the details view panel */
            this.opportunityDetail.lastModified = this.opportunityDetail.lastModified.slice(6);
            this.opportunityDetail.lastModified = parseInt(this.opportunityDetail.lastModified);
            this.opportunityDetail.lastModified = new Date(this.opportunityDetail.lastModified);
            this.opportunityDetail.lastModified = this.opportunityDetail.lastModified.toDateString();
            /* Expands the pane */
            this.moreState = true;
            window.scrollTo(0, 100);
        }
    },
    created: function () {
        // GET OPPORTUNITY LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetOpportunities",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.opportunities = data;
                // GET CLIENT LIST
                $.ajax({
                    async: false,
                    cache: false,
                    type: "GET",
                    url: "GetClientList",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        this.clients = data;
                        // GET UNIT LIST
                        $.ajax({
                            async: false,
                            cache: false,
                            type: "GET",
                            url: "GetUnitList",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                this.units = data;
                                
                            }.bind(this)
                        });
                    }.bind(this)
                });
            }.bind(this)
        });
        $.ajax({ // Region List
            async: false,
            cache: false,
            type: "GET",
            url: "GetRegionList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.regions = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
        $.ajax({ // AE list
            async: false,
            cache: false,
            type: "GET",
            url: "GetAEList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.aes = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
        $.ajax({ // User list
            async: false,
            cache: false,
            type: "GET",
            url: "GetUserList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.users = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
        $.ajax({ // sold status list
            async: false,
            cache: false,
            type: "GET",
            url: "GetSoldStatusList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.soldStatuses = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
        $.ajax({ // ACT LEAD aka opportunity owner
            async: false,
            cache: false,
            type: "GET",
            url: "GetACTLeadList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.ACTLeads = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
    }
});