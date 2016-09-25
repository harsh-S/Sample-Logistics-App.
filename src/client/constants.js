export const BASE_URL = 'http://localhost:3000/',

			STATUS_CREATED = 1,
			STATUS_PICKUP = 2,
			STATUS_IN_TRANSIT = 3,
			STATUS_OUT_FOR_DELIVERY = 4,
			STATUS_SHIPMENT_ISSUE = 5,
			STATUS_RETURNED = 6,
			STATUS_DELIVERED = 7,
			statuses = (() => {
				let dict = {}
				dict[STATUS_CREATED] = 'Created'
				dict[STATUS_PICKUP] = 'Pickup'
				dict[STATUS_IN_TRANSIT] = 'In Transit'
				dict[STATUS_OUT_FOR_DELIVERY] = 'Out For Delivery'
				dict[STATUS_RETURNED] = 'Returned'
				dict[STATUS_DELIVERED] = 'Delivered'
				return dict
			})(),

			WEIGHT_UNIT_GRAM = 1,
			WEIGHT_UNIT_KILOGRAM = 2,

			weight_units = (() => {
				let dict = {}
				dict[WEIGHT_UNIT_GRAM] = 'gm'
				dict[WEIGHT_UNIT_KILOGRAM] = 'kg'
				return dict
			})(),

			PAYMENT_TYPE_PREPAID = 1,
			PAYMENT_TYPE_CASH_ON_DELIVERY = 2,

			payment_types = (() => {
				let dict = {}
				dict[PAYMENT_TYPE_PREPAID] = 'prepaid'
				dict[PAYMENT_TYPE_CASH_ON_DELIVERY] = 'cash_on_delivery'
				return dict
			})(),

			ZONE_A = 1,
			ZONE_B = 2,
			ZONE_C = 3,
			ZONE_D = 4,
			ZONE_E = 5,

			// This object may be less useful now, but allows flexibility 
			// to add more information about zones in future
			zones = (() => {
				let dict = {}
				dict[ZONE_A] = 'A'
				dict[ZONE_B] = 'B'
				dict[ZONE_C] = 'C'
				dict[ZONE_D] = 'D'
				dict[ZONE_E] = 'E'
				return dict
			})(),

			defaultLimit = 10
