"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FundDetailsComponent = void 0;
var core_1 = require("@angular/core");
var FundDetailsComponent = /** @class */ (function () {
    function FundDetailsComponent(auth, projectService, activityService, route, router, transactionService) {
        this.auth = auth;
        this.projectService = projectService;
        this.activityService = activityService;
        this.route = route;
        this.router = router;
        this.transactionService = transactionService;
        this.transactions = [];
        this.errorMessage = '';
        this.sum = 0;
        this.type = 1;
        this.checkboxRemind = [];
    }
    FundDetailsComponent.prototype.ngOnInit = function () {
        this.loadProject();
    };
    FundDetailsComponent.prototype.loadProject = function () {
        var _this = this;
        this.projectService.get(this.route.snapshot.params.id).subscribe(function (response) {
            _this.currentProject = response.data;
            _this.loadActivities();
            _this.loadMembers();
            _this.loadTransaction();
            _this.checkboxRemind = [];
        }, function (errorResponse) {
            _this.router.navigate(['/404']);
        });
    };
    FundDetailsComponent.prototype.loadActivities = function () {
        var _this = this;
        this.activityService.findAllInProject(this.currentProject.id).subscribe(function (response) { return _this.activities = response.data; }, function (errorResponse) { return _this.errorMessage = errorResponse.error.message; });
    };
    FundDetailsComponent.prototype.loadMembers = function () {
        var _this = this;
        this.projectService.getMembers(this.currentProject.id).subscribe(function (response) { return _this.members = response.data; }, function (errorResponse) { return _this.errorMessage = errorResponse.error.message; });
    };
    FundDetailsComponent.prototype.loadTransaction = function () {
        var _this = this;
        this.transactionService.getTransaction(this.currentProject.id).subscribe(function (response) { return _this.transactions = response.data; }, 
        //    this.transactions[2].memo = this.transactions[2].memo.toString();
        function (errorResponse) { return _this.errorMessage = errorResponse.error.messsage; });
    };
    FundDetailsComponent.prototype.saveTransaction = function () {
        var _this = this;
        var inputElems = document.getElementsByTagName("input");
        for (var i = 0; i < inputElems.length; i++) {
            if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
                var data_1 = {
                    userId: Number(inputElems[i].getAttribute("id")),
                    fundId: this.currentProject.funds[0].id,
                    amount: Number(inputElems[i].getAttribute("value")),
                    typeId: 1,
                    memo: "Funding"
                };
                this.sum += data_1.amount;
                this.transactionService.create(data_1).subscribe(function (response) { return _this.loadProject(); }, function (errorResponse) { return _this.errorMessage = errorResponse.error.message; });
            }
        }
        var data = {
            id: this.currentProject.funds[0].id,
            amount: this.sum
        };
        this.transactionService.calc(this.type, data).subscribe(function (response) { return _this.loadProject(); }, function (errorResponse) { return _this.errorMessage = errorResponse.error.message; });
        this.sum = 0;
    };
    FundDetailsComponent.prototype.remind = function () {
        var _this = this;
        var inputElems = document.getElementsByTagName("input");
        var _loop_1 = function (i) {
            if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
                //     this.checkboxRemind[i] = 1;
                var data_2 = {
                    userId: Number(inputElems[i].getAttribute("id")),
                    projectId: this_1.currentProject.id,
                    amount: Number(inputElems[i].getAttribute("value")),
                    typeId: 1
                };
                this_1.transactionService.remind(data_2).subscribe(function (response) {
                    _this.checkboxRemind.push(data_2.userId);
                    jQuery('#reminderEmailRecipientsDialog').modal('show');
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < inputElems.length; i++) {
            _loop_1(i);
        }
        this.loadProject();
    };
    FundDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-fund-details',
            templateUrl: './fund-details.component.html',
            styleUrls: ['./fund-details.component.scss']
        })
    ], FundDetailsComponent);
    return FundDetailsComponent;
}());
exports.FundDetailsComponent = FundDetailsComponent;
