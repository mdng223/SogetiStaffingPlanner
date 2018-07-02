﻿let requests = {
    getRegionList: function (that) {
        $.ajax({ // Region List
            async: false,
            cache: false,
            type: "GET",
            url: "GetRegionList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.regions = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getAEList: function (that) {
        $.ajax({ // AE list
            async: false,
            cache: false,
            type: "GET",
            url: "GetAEList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.aes = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getUserList: function (that) {
        $.ajax({ // User list
            async: false,
            cache: false,
            type: "GET",
            url: "GetUserList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.users = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getSoldStatusList: function (that) {
        $.ajax({ // sold status list
            async: false,
            cache: false,
            type: "GET",
            url: "GetSoldStatusList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.soldStatuses = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getACTLeadList: function (that) {
        $.ajax({ // ACT LEAD aka opportunity owner
            async: false,
            cache: false,
            type: "GET",
            url: "GetACTLeadList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.ACTLeads = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getUnitList: function (that) {
        // GET UNIT LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetUnitList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.units = data;

            }.bind(that)
        });
    },
    getClientList: function (that) {
        // GET CLIENT LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetClientList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.clients = data;
            }.bind(that)
        });
    },
    getOpportunityList: function (that) {
        // GET OPPORTUNITY LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetOpportunities",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.opportunities = data;

            }.bind(that)
        });
    }
}