import { expect } from 'chai';
import {
	addPackage,
	editPackage,
	dismissModal,
	savePackage,
	updatePackagesField,
	ADD_PACKAGE,
	EDIT_PACKAGE,
	DISMISS_MODAL,
	SAVE_PACKAGE,
	UPDATE_PACKAGES_FIELD,
} from '../actions';

describe( 'Packages state actions', () => {
	it( '#addPackage()', () => {
		expect( addPackage() ).to.eql( {
			type: ADD_PACKAGE,
		} );
	} );

	it( '#editPackage()', () => {
		const packageToEdit = {
			name: 'Test box',
			dimensions: '10 x 13 x 6',
			is_letter: false,
		};
		expect( editPackage( packageToEdit ) ).to.eql( {
			type: EDIT_PACKAGE,
			package: packageToEdit,
		} );
	} );

	it( '#dismissModal()', () => {
		expect( dismissModal() ).to.eql( {
			type: DISMISS_MODAL,
		} );
	} );

	it( '#savePackage()', () => {
		const settings_key = 'boxes';
		const packageData = {
			name: 'Test box',
			dimensions: '10 x 13 x 6',
			is_letter: false,
		};
		expect( savePackage( settings_key, packageData ) ).to.eql( {
			type: SAVE_PACKAGE,
			settings_key,
			packageData,
		} );
	} );

	it( '#updatePackagesField()', () => {
		const fieldsToUpdate = {
			name: 'Test box',
			dimensions: '10 x 13 x 6',
			is_letter: false,
		};
		expect( updatePackagesField( fieldsToUpdate ) ).to.eql( {
			type: UPDATE_PACKAGES_FIELD,
			values: fieldsToUpdate,
		} );
	} );
} );
