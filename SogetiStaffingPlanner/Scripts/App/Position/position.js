
let position = new Vue({
    el: '#app',
    data: {
        positions: '',
        positionDetail: null,
        title: 'Positions',
        addState: false,
        moreState: false,
        updateState: false,
        positionName: '',
        positionId: null,
        opportunityId: null,
        unitPracticeId: null,
        maxConsultantGradeId: null,
        minConsultantGradeId: null,
        numberOfPositions: null,
        duration: '',
        acceptedCandidate: '',
        skillset: '',
        rate: '',
        expectedStartDate: '',
        hireCandidate: '',
        proposedCandidate: '',
        rejectedCandidate: '',
        positionStatusId: '',
        positionNote: '',
        opportunities: '',
        units: '',
        users: '',
        positionStatuses: '',
        grades: '',
        errors: {}, // builds all the errors
    },
    watch: {
        positionName: function (val) {
            validate.checkPositionName(val, this);
        },
        duration: function (val) {
            validate.checkDuration(val, this);
        },
        acceptedCandidate: function (val) {
            validate.checkAcceptedCandidate(val, this);
        },
        skillset: function (val) {
            validate.checkSkillset(val, this);
        },
        rate: function (val) {
            validate.checkRate(val, this);
        },
        expectedStartDate: function (val) {
            validate.checkExpectedStartDate(val, this);
        },
        hireCandidate: function (val) {
            validate.checkHireCandidate(val, this);
        },
        proposedCandidate: function (val) {
            validate.checkProposedCandidate(val, this);
        },
        rejectedCandidate: function (val) {
            validate.checkRejectedCandidate(val, this);
        },
        positionNote: function (val) {
            validate.checkPositionNote(val, this);
        },
        numberOfPositions: function (val) {
            validate.checkNumberOfPositions(val, this);
        },
        positionStatusId: function (val) {
            validate.checkPositionStatusId(val, this);
        },
        opportunityId: function (val) {
            validate.checkOpportunityId(val, this);
        },
        unitPracticeId: function (val) {
            validate.checkUnitPracticeId(val, this);
        },
        minConsultantGradeId: function (val) {
            validate.checkMinConsultantGradeId(val, this);
        },
        maxConsultantGradeId: function (val) {
            validate.checkMaxConsultantGradeId(val, this);
        }
    },
    methods: {
        onSubmit: function () {   
            if (!this.errors.length) {
                if (this.updateState) {
                    this.updatePosition();
                }
                else if (this.addState) {
                    this.addPosition();
                }
            } 
        },
        cancel: function () {
            this.errors = {};
            this.addState = false;
            posHelpers.clearForm(this);
            
        },
        addPosition: function () {
            this.errors = {};
            this.checkForm();
            let data = posHelpers.buildJSON(this);
            /* Get user submitted date value and convert to proper format for controller method */
            let parts = this.expectedStartDate.split('-')
            let date = new Date(parts);
            date = date.toISOString();
            data.expectedStartDate = date;
            /* Set last modified date to present time, as this is initial creation of position */        
            data.lastModified = new Date().toISOString();
            $.ajax({
                type: "POST",
                url: "AddPosition",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    posHelpers.clearForm(this);
                    requests.fetchPositions(this);
                    console.log('POST request success');
                    alert('Successfully added');
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        updatePosition: function () {
            let data = posHelpers.buildJSON(this);
            data.expectedStartDate = new Date(data.expectedStartDate);

            console.log('data', data);
            $.ajax({
                type: "POST",
                url: "EditPosition",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    
                    alert('Successfully updated ' + this.positionName + '.');
                    posHelpers.clearForm(this);
                    requests.fetchPositions(this);
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        checkForm: function () {
            validate.checkForm(this);
        },
        onEdit: function (position) {           
            this.errors = {};
            /* Specify that status is being updated */
            this.updateState = true;
            /* Populate form with selected values */
            this.positionName = position.PositionName;
            this.positionId = position.PositionId;
            this.duration = position.Duration;
            this.acceptedCandidate = position.AcceptedCandidate;
            this.skillset = position.Skillset;
            this.rate = position.Rate;
            /* Format expected start date to correctly display data */
            this.expectedStartDate = position.ExpectedStartDate;
            this.expectedStartDate = this.expectedStartDate.slice(6);
            this.expectedStartDate = parseInt(this.expectedStartDate);
            this.expectedStartDate = new Date(this.expectedStartDate);
            this.expectedStartDate = this.expectedStartDate.toISOString();
            this.expectedStartDate = this.expectedStartDate.slice(0, 10);           
            this.hireCandidate = position.HireCandidate;
            this.proposedCandidate = position.ProposedCandidate;
            this.rejectedCandidate = position.RejectedCandidate;
            this.positionNote = position.PositionNote;
            this.numberOfPositions = position.NumberOfPositions;
            this.maxConsultantGradeId = position.MaxConsultantGradeId;
            this.minConsultantGradeId = position.MinConsultantGradeId;   
            this.opportunityId = position.OpportunityId;        
            this.unitPracticeId = position.UnitPracticeId;
            this.positionStatusId = position.PositionStatusId;           
            /* Set form to drop down */
            this.addState = true;          
        },
        displayDetail: function (position) {
            this.positionDetail = position;
            this.positionDetail.ExpectedStartDate = this.positionDetail.ExpectedStartDate.slice(6);
            this.positionDetail.ExpectedStartDate = parseInt(this.positionDetail.ExpectedStartDate);
            this.positionDetail.ExpectedStartDate = new Date(this.positionDetail.ExpectedStartDate);
            this.positionDetail.ExpectedStartDate = this.positionDetail.ExpectedStartDate.toISOString().slice(0, 10);
            /* Produces a human readable string for the details view panel */
            this.positionDetail.LastModified = this.positionDetail.LastModified.slice(6);
            this.positionDetail.LastModified = parseInt(this.positionDetail.LastModified);
            this.positionDetail.LastModified = new Date(this.positionDetail.LastModified);
            this.positionDetail.LastModified = this.positionDetail.LastModified.toDateString();           
            this.moreState = true;
        },
         getOpportunityName: function (opportunityId) {
            for (opportunity in this.opportunities) {
                if (this.opportunities[opportunity].OpportunityId == opportunityId) {
                    return (this.opportunities[opportunity].OpportunityName);
                }
            }
        },
    },
    created: function () {
        requests.postPosition();
        requests.fetchPositions(this);
        requests.getUserList(this);
        requests.getOpportunityList(this);
        requests.getUnitList(this);
        requests.getPositionStatusList(this);
        requests.getGradeList(this);
    }
})