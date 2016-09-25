import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Table, Pagination, Tabs, Tab } from 'react-bootstrap'
import { statuses, weight_units, payment_types, zones, defaultLimit } from './constants.js'
import { fetchShipments } from './network.js'

class Invoices extends Component {
	constructor(props){
		super(props)
		this.state = {
			shipments: [],
			clientSummary: {},
			vendorSummary: {},
			activePage: 1,
			totalInvoices: 0,
			limit: defaultLimit
		}
		this.refresh = this.refresh.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
	}
	componentDidMount(){
		this.refresh()
	}
	refresh(){
		const _state = this.state
		fetchShipments((_state.activePage-1)*_state.limit, _state.limit, jqXHR => {
			this.setState({
				shipments: jqXHR.shipments, 
				clientSummary: jqXHR.clientSummary, 
				vendorSummary: jqXHR.vendorSummary,
				totalInvoices: jqXHR.total_shipments})
		}, jqXHR => alert('Some error occured'))
	}
	handleSelect(eventkey){
		this.setState({activePage: eventkey}, this.refresh)
	}
	render(){
		const _state = this.state
		return(
			<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
			    <Tab eventKey={1} title="Shipments">
					<Button bsStyle="primary" className="pull-right" onClick={this.refresh}>Refresh</Button>
					{/*Shipments table with pagination*/}
					<Pagination
				        prev
				        next
				        first
				        last
				        ellipsis
				        boundaryLinks
				        items={Math.ceil(_state.totalInvoices/_state.limit)}
				        maxButtons={5}
				        activePage={_state.activePage}
				        onSelect={this.handleSelect} />
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
								<td>{shipment.vendor}</td>
								<td>{zones[parseInt(shipment.zone)]}</td>
								<td>{shipment.client_price}</td>
								<td>{shipment.vendor_price}</td>
								<td>{shipment.client_price - shipment.vendor_price}</td>
							</tr>)}
						</tbody>
					</Table>
					<Pagination
				        prev
				        next
				        first
				        last
				        ellipsis
				        boundaryLinks
				        items={Math.ceil(_state.totalInvoices/_state.limit)}
				        maxButtons={5}
				        activePage={_state.activePage}
				        onSelect={this.handleSelect} />    	
			    </Tab>
			    <Tab eventKey={2} title="Client Summary">
			    	<Button bsStyle="primary" onClick={this.refresh}>Refresh</Button>
			    	{/*Per Client Summary Table without pagination; TODO: add pagination*/}
					<Table striped bordered condensed hover>
						<thead>
							<th>Client ID</th>
							<th>Total Amount Charged</th>
							<th>Number of Orders Delivered/Returned</th>
						</thead>
						<tbody>
							{Object.keys(_state.clientSummary).map(key =>
							<tr key={key}>
								<td>{key}</td>
								<td>{_state.clientSummary[key].total_amount_charged}</td>
								<td>{_state.clientSummary[key].num_of_shipments_delivered}</td>
							</tr>)}
						</tbody>
					</Table>
			    </Tab>
			    <Tab eventKey={3} title="Vendor Summary">
			    	<Button bsStyle="primary" onClick={this.refresh}>Refresh</Button>
			    	{/*Per Vendor Summary Table*/}
			    	<Table striped bordered condensed hover>
						<thead>
							<th>Vendor ID</th>
							<th>Total Amount Charged</th>
							<th>Number of Orders Delivered/Returned</th>
						</thead>
						<tbody>
							{Object.keys(_state.vendorSummary).map(key =>
							<tr key={key}>
								<td>{key}</td>
								<td>{_state.vendorSummary[key].total_amount_charged}</td>
								<td>{_state.vendorSummary[key].num_of_shipments_delivered}</td>
							</tr>)}
						</tbody>
					</Table>
			    </Tab>
			</Tabs>
		)
	}
}

ReactDOM.render(<Invoices />,document.getElementById('root'))