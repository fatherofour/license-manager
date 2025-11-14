"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseStatus = exports.LicenseCategory = void 0;
var LicenseCategory;
(function (LicenseCategory) {
    LicenseCategory["MICROSOFT_365"] = "Microsoft 365";
    LicenseCategory["WINDOWS"] = "Windows";
    LicenseCategory["SOPHOS"] = "Sophos";
    LicenseCategory["ZOHO"] = "Zoho";
    LicenseCategory["VOUCHER"] = "Voucher";
})(LicenseCategory || (exports.LicenseCategory = LicenseCategory = {}));
var LicenseStatus;
(function (LicenseStatus) {
    LicenseStatus["ACTIVE"] = "active";
    LicenseStatus["EXPIRING"] = "expiring";
    LicenseStatus["EXPIRED"] = "expired";
    LicenseStatus["SUSPENDED"] = "suspended";
})(LicenseStatus || (exports.LicenseStatus = LicenseStatus = {}));
