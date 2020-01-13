import React, { Component } from 'react'

export default class ErrorBoundary1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		}
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	render() {
		if(this.state.hasError) {
			return (
			<div>
				Error! God must hate you.
			</div>
			)
		}
		return this.props.children
	}
}