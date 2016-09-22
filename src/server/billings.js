function Freight(first_500, addl_500, return_500){
	this.first_500 = first_500
	this.addl_500 = addl_500
	this.return_500 = return_500
}

function ZoneSlab(A, B, C, D, E){
	this.A = new Freight(A[0], A[1], A[2])
	this.B = new Freight(B[0], B[1], B[2])
	this.C = new Freight(C[0], C[1], C[2])
	this.D = new Freight(D[0], D[1], D[2])
	this.E = new Freight(E[0], E[1], E[2])
}

function CodSlab(baseCharge, percentageCharge){
	this.chargeType = 'max_of_base_percentage'
	this.baseCharge = baseCharge
	this.percentageCharge = percentageCharge
}

function BillingsSlab(fuelSurcharge, codBaseCharge, codPercentageCharge, zoneSlab){
	this.billingUnitWeight = 500
	this.billingBaseUnit = WEIGHT_UNIT_GRAM
	this.minimumBillingUnits = 1
	this.fuelSurcharge = fuelSurcharge
	this.slab = { zones: zoneSlab }
	this.codSlab = new codSlab(codBaseCharge, codPercentageCharge)
}

module.exports = {
	Freight: Freight,
	ZoneSlab: ZoneSlab,
	CodSlab: CodSlab,
	BillingsSlab: BillingsSlab
}