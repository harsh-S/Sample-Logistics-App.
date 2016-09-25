var billings = require('./billings.js')

var STATUS_CREATED = 1,
	STATUS_PICKUP = 2,
	STATUS_IN_TRANSIT = 3,
	STATUS_OUT_FOR_DELIVERY = 4,
	STATUS_SHIPMENT_ISSUE = 5,
	STATUS_RETURNED = 6,
	STATUS_DELIVERED = 7

var statuses = (function(){
	var dict = {}
	dict[STATUS_CREATED] = 'Created'
	dict[STATUS_PICKUP] = 'Pickup'
	dict[STATUS_IN_TRANSIT] = 'In Transit'
	dict[STATUS_OUT_FOR_DELIVERY] = 'Out For Delivery'
	dict[STATUS_RETURNED] = 'Returned'
	dict[STATUS_DELIVERED] = 'Delivered'
	return dict
})()

var WEIGHT_UNIT_GRAM = 1,
	WEIGHT_UNIT_KILOGRAM = 2

var weight_units = (function(){
	var dict = {}
	dict[WEIGHT_UNIT_GRAM] = 'gm'
	dict[WEIGHT_UNIT_KILOGRAM] = 'kg'
	return dict
})()

var PAYMENT_TYPE_PREPAID = 1,
	PAYMENT_TYPE_CASH_ON_DELIVERY = 2

var payment_types = (function(){
	var dict = {}
	dict[PAYMENT_TYPE_PREPAID] = 'prepaid'
	dict[PAYMENT_TYPE_CASH_ON_DELIVERY] = 'cash_on_delivery'
	return dict
})()

var ZONE_A = 1,
	ZONE_B = 2,
	ZONE_C = 3,
	ZONE_D = 4,
	ZONE_E = 5

// This object may be less useful now, but allows flexibility 
// to add more information about zones in future
var zones = (function(){
	var dict = {}
	dict[ZONE_A] = 'A'
	dict[ZONE_B] = 'B'
	dict[ZONE_C] = 'C'
	dict[ZONE_D] = 'D'
	dict[ZONE_E] = 'E'
	return dict
})()

var VENDOR_1 = 1,
	VENDOR_2 = 2,
	VENDOR_3 = 3,
	VENDOR_4 = 4

var vendors = (function(){
	var dict = {}
	// Can add additional info about vendors here
	dict[VENDOR_1] = {
		billingSlab: new billings.BillingsSlab(0.40, 40, 1.8, new billings.ZoneSlab([25,15,15],[30,20,20],[35,25,30],[40,30,35],[45,35,40]))
	}
	dict[VENDOR_2] = {
		billingSlab: new billings.BillingsSlab(0.45, 42, 1.8, new billings.ZoneSlab([30,30,30],[32,32,32],[40,40,40],[45,45,45],[48,48,48]))
	}
	dict[VENDOR_3] = {
		billingSlab: new billings.BillingsSlab(0.25, 41.5, 0, new billings.ZoneSlab([40,40,20],[40,40,30],[40,40,40],[40,40,50],[40,40,60]))
	}
	dict[VENDOR_4] = {
		billingSlab: new billings.BillingsSlab(0.20, 45, 2.0, new billings.ZoneSlab([25,22,0],[25,22,0],[40,35,0],[40,35,0],[40,35,0]))
	}
	return dict
})()

var clientRates = {
	dateFrom: '2015-01- 01',
	dateTo: null,
	carriers: Object.keys(vendors),
	billingSlab: new billings.BillingsSlab(0.25, 50, 0.02, new billings.ZoneSlab([25,25,0],[25,20,0],[35,30,0],[45,40,0],[55,50,0]))
}

module.exports = {
	STATUS_CREATED: STATUS_CREATED,
	STATUS_PICKUP: STATUS_PICKUP,
	STATUS_IN_TRANSIT: STATUS_IN_TRANSIT,
	STATUS_OUT_FOR_DELIVERY: STATUS_OUT_FOR_DELIVERY,
	STATUS_SHIPMENT_ISSUE: STATUS_SHIPMENT_ISSUE,
	STATUS_RETURNED: STATUS_RETURNED,
	STATUS_DELIVERED: STATUS_DELIVERED,
	statuses: statuses,
	WEIGHT_UNIT_GRAM: WEIGHT_UNIT_GRAM,
	WEIGHT_UNIT_KILOGRAM: WEIGHT_UNIT_KILOGRAM,
	weight_units: weight_units,
	PAYMENT_TYPE_PREPAID: PAYMENT_TYPE_PREPAID,
	PAYMENT_TYPE_CASH_ON_DELIVERY: PAYMENT_TYPE_CASH_ON_DELIVERY,
	payment_types: payment_types,
	ZONE_A: ZONE_A,
	ZONE_B: ZONE_B,
	ZONE_C: ZONE_C,
	ZONE_D: ZONE_D,
	ZONE_E: ZONE_E,
	zones: zones,
	VENDOR_1: VENDOR_1,
	VENDOR_2: VENDOR_2,
	VENDOR_3: VENDOR_3,
	VENDOR_4: VENDOR_4,
	vendors: vendors,
	filePath: '/home/harsh/Downloads/sample_data.csv',
	clientRates: clientRates,
	pincode_regex: new RegExp(/^[1-9][0-9]{5}$/)
}