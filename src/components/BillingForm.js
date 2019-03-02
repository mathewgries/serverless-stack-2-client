import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { CardElement, injectStripe } from 'react-stripe-elements'
import LoaderButton from '../components/LoaderButton'
import './BillingForm.css'

class BillingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            storage: '',
            isProcessing: false,
            isCardComplete: false
        }
    }

    validateForm() {
        return (
            this.state.name !== '' &&
            this.state.storage !== '' &&
            this.state.isCardComplete
        )
    }

    handleFieldChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleCardFieldChange = (e) => {
        this.setState({
            isCardComplete: e.complete
        })
    }

    handleSubmitClick = async (e) => {
        e.preventDefault()
        const { name } = this.state
        this.setState({ isProcessing: true })
        const { token, error } = await this.props.stripe.createToken({ name })
        this.setState({ isProcessing: false })
        this.props.onSubmit(this.state.storage, { token, error })
    }

    render() {
        const loading = this.state.isProcessing || this.props.loading

        return (
            <form className='BillingForm' onSubmit={this.handleSubmitClick}>
                <FormGroup bsSize='large' controlId='storage'>
                    <ControlLabel>Storage</ControlLabel>
                    <FormControl
                        min='0'
                        type='number'
                        value={this.state.storage}
                        onChange={this.handleFieldChange}
                        placeholder='Number of notes to store'
                    />
                </FormGroup>
                <hr />
                <FormGroup bsSize='large' controlId='name'>
                    <ControlLabel>Name</ControlLabel>
                    <CardElement
                        className='card-field'
                        onChange={this.handleCardFieldChange}
                        style={{
                            base: { fontSize: '18px', fontFamily: '"Open Sans", sand-serif' }
                        }}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    bsSize='large'
                    type='submit'
                    text='Purchase'
                    isLoading={loading}
                    loadingText='Purchasing...'
                    disabled={!this.validateForm()}
                />
            </form>
        )
    }
}

export default injectStripe(BillingForm)