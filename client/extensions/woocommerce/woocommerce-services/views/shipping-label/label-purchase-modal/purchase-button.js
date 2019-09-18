/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import formatCurrency from '@automattic/format-currency';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import getPDFSupport from 'woocommerce/woocommerce-services/lib/utils/pdf-support';
import {
	confirmPrintLabel,
	purchaseLabel,
} from 'woocommerce/woocommerce-services/state/shipping-label/actions';
import {
	getShippingLabel,
	isLoaded,
	getTotalPriceBreakdown,
	canPurchase,
} from 'woocommerce/woocommerce-services/state/shipping-label/selectors';
import {
	getSelectedPaymentMethodId,
} from 'woocommerce/woocommerce-services/state/label-settings/selectors';
import { getOrigin } from 'woocommerce/lib/nav-utils';

const getPurchaseButtonLabel = props => {
	const {
		form,
		ratesTotal,
		translate,
		hasLabelsPaymentMethod,
	} = props;

	if ( ! hasLabelsPaymentMethod ) {
		return translate( 'Add credit card' );
	}

	if ( form.needsPrintConfirmation ) {
		return translate( 'Print' );
	}

	if ( form.needsPrintConfirmation ) {
		return translate( 'Print' );
	}

	if ( form.isSubmitting ) {
		return translate( 'Purchasing…' );
	}

	const noNativePDFSupport = 'addon' === getPDFSupport();

	if ( props.canPurchase ) {
		if ( noNativePDFSupport ) {
			return translate( 'Buy (%s)', { args: [ formatCurrency( ratesTotal, 'USD' ) ] } );
		}

		return translate( 'Buy & Print (%s)', { args: [ formatCurrency( ratesTotal, 'USD' ) ] } );
	}

	if ( noNativePDFSupport ) {
		return translate( 'Buy' );
	}

	return translate( 'Buy & Print' );
};

const onAddCardExternal = () => {
	window.open( getOrigin() + '/me/purchases/add-credit-card' );
};

const PurchaseButton = props => {
	const { form, hasLabelsPaymentMethod } = props;
	let purchaseHandler;
	if ( hasLabelsPaymentMethod ) {
		purchaseHandler = form.needsPrintConfirmation ? props.confirmPrintLabel : props.purchaseLabel;
	} else {
		purchaseHandler = onAddCardExternal;
	}
	return (
		<Button
			disabled={ ! form.needsPrintConfirmation && ( ! props.canPurchase || form.isSubmitting ) }
			onClick = { purchaseHandler }
			primary
			busy={ form.isSubmitting && ! form.needsPrintConfirmation }
		>
			{ getPurchaseButtonLabel( props ) }
		</Button>
	);
};

PurchaseButton.propTypes = {
	siteId: PropTypes.number.isRequired,
	orderId: PropTypes.number.isRequired,
};

const mapStateToProps = ( state, { orderId, siteId } ) => {
	const loaded = isLoaded( state, orderId, siteId );
	const shippingLabel = getShippingLabel( state, orderId, siteId );
	const priceBreakdown = getTotalPriceBreakdown( state, orderId, siteId );
	return {
		loaded,
		form: loaded && shippingLabel.form,
		canPurchase: loaded && canPurchase( state, orderId, siteId ),
		ratesTotal: priceBreakdown ? priceBreakdown.total : 0,
		hasLabelsPaymentMethod: Boolean( getSelectedPaymentMethodId( state, siteId ) ),
	};
};

const mapDispatchToProps = ( dispatch, { orderId, siteId } ) => ( {
	confirmPrintLabel: () => dispatch( confirmPrintLabel( orderId, siteId ) ),
	purchaseLabel: () => dispatch( purchaseLabel( orderId, siteId ) ),
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( localize( PurchaseButton ) );
