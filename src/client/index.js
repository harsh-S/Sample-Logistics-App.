import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Table } from 'react-bootstrap'
import { statuses, weight_units, payment_types, zones, defaultLimit } from './constants.js'
import { fetchShipments } from './network.js'

class Invoices extends Component {
	constructor(props){
		super(props)
		this.state = {
			shipments: [],
			clientSummary: {},
			vendorSummary: {},
			offset: 0,
			limit: defaultLimit
		}
		this.refresh = this.refresh.bind(this)
	}
	componentDidMount(){
		this.refresh()
	}
	refresh(){
		const _state = this.state
		fetchShipments(_state.offset, _state.limit, jqXHR => {
			this.setState({
				shipments: jqXHR.shipments, 
				clientSummary: jqXHR.clientSummary, 
				vendorSummary: jqXHR.vendorSummary})
		}, jqXHR => alert('Some error occured'))
	}
	render(){
		const _state = this.state
		return(
			<div>
				<Button onClick={this.refresh}>Refresh</Button>
				{/*Per Vendor Summary Table*/}
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Vendor ID</th>
							<th>Total Amount Charged</th>
							<th>Number of Orders Delivered/Returned</th>
						</tr>
						<tbody>
							{Object.keys(_state.vendorSummary).map(key =>
							<tr key={key}>
								<td>{key}</td>
								<td>{_state.vendorSummary[key].total_amount_charged}</td>
								<td>{_state.vendorSummary[key].num_of_shipments_delivered}</td>
							</tr>)}
						</tbody>
					</thead>
				</Table>
				{/*Per Client Summary Table without pagination; TODO: add pagination*/}
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Client ID</th>
							<th>Total Amount Charged</th>
							<th>Number of Orders Delivered/Returned</th>
						</tr>
						<tbody>
							{Object.keys(_state.clientSummary).map(key =>
							<tr key={key}>
								<td>{key}</td>
								<td>{_state.clientSummary[key].total_amount_charged}</td>
								<td>{_state.clientSummary[key].num_of_shipments_delivered}</td>
							</tr>)}
						</tbody>
					</thead>
				</Table>
				{/*Shipments table with pagination*/}
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Shipment ID</th>
							<th>Weight</th>
							<th>Payment Type</th>
							<th>Order Value</th>
							<th>Origin Pincode</th>
							<th>Destination Pincode</th>
							<th>Client ID</th>
							<th>Status</th>
							<th>Vendor</th>
							<th>Zone</th>
							<th>Client Price</th>
							<th>Vendor Price</th>
							<th>Net Profit/Loss</th>
						</tr>
					</thead>
					<tbody>
						{_state.shipments.map(shipment =>
						<tr key={shipment.shipment_id}>
							<td>{shipment.shipment_id}</td>
							<td>{shipment.weight + ' ' + weight_units[parseInt(shipment.weight_unit)]}</td>
							<td>{payment_types[parseInt(shipment.payment_type)]}</td>
							<td>{shipment.order_value}</td>
							<td>{shipment.origin_pincode}</td>
							<td>{shipment.destination_pincode}</td>
							<td>{shipment.client_id}</td>
							<td>{statuses[parseInt(shipment.status)]}</td>
							<td>{vendors[parseInt(shipment.vendor)]}</td>
							<td>{zones[parseInt(shipment.zone)]}</td>
							<td>{shipment.client_price}</td>
							<td>{shipment.vendor_price}</td>
							<td>{shipment.client_price - shipment.vendor_price}</td>
						</tr>)}
					</tbody>
				</Table>
			</div>
		)
	}
}

ReactDOM.render(<Invoices />,document.getElementById('root'))