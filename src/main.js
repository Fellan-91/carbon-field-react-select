/**
 * External dependencies.
 */
const { Component } = wp.element;
const { __ } = wp.i18n;
import Select from 'react-select';
import PropTypes from 'prop-types';

class React_Select_Field extends Component {

    /**
     * Handles the change of the input.
     *
     * @param {Object} e
     * @return {void}
     */
    handleChange = ( e ) => {
        const { id, onChange } = this.props;

        onChange( id, e.value );
    }

    getLabel( value ) {
        const { field } = this.props;
        let label = '';
        if ( typeof field.options !== 'undefined' ) {
            Object.keys( field.options ).map( ( k ) => {
                if ( field.options[ k ].value === value ) {
                    label = field.options[ k ].label;
                }
            } );
        }
        return label;
    }
    /**
     * Renders the component.
     *
     * @return {Object}
     */
    render() {
        const {
            id,
            name,
            field
        } = this.props;
        const value = field.value ? { value: field.value, label: this.getLabel( field.value ) } : '';
        console.log(field.props);

        return (
            field.options.length > 0
                ? (
                    <Select
                        id={ id }
                        name={ name }
                        value={ value }
                        options={ field.options }
                        onChange={ this.handleChange }
                        {...field.props}
                    />
                )
                : __( 'No options' )
        );
    }
}

/**
 * Validate the props.
 *
 * @type {Object}
 */
React_Select_Field.propTypes = {
    name: PropTypes.string,
    field: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
            name: PropTypes.string,
        })),
        props: PropTypes.arrayOf(PropTypes.shape({
            isClearable: PropTypes.bool,
            isDisabled: PropTypes.bool,
            autoFocus: PropTypes.bool,
            closeMenuOnSelect: PropTypes.bool,
            ignoreAccents: PropTypes.bool,
            ignoreCase: PropTypes.bool,
            labelKey: PropTypes.string,
            multi: PropTypes.bool,
            onBlurResetsInput: PropTypes.bool,
            onCloseResetsInput: PropTypes.bool,
            onSelectResetsInput: PropTypes.bool,
            openOnClick: PropTypes.bool,
            openOnFocus: PropTypes.bool,
            removeSelected: PropTypes.bool,
            pageSize: PropTypes.number,
            rtl: PropTypes.bool,
            scrollMenuIntoView: PropTypes.bool,
            isSearchable: PropTypes.bool,
            simpleValue: PropTypes.bool,
            tabSelectsValue: PropTypes.bool,
            trimFilter: PropTypes.bool,
            valueKey: PropTypes.string,
            className: PropTypes.string,

            placeholder: PropTypes.string,
            clearAllText: PropTypes.string,
            clearValueText: PropTypes.string,
            noResultsText: PropTypes.string,
            searchPromptText: PropTypes.string,
        })),
    }),
    handleChange: PropTypes.func,
};

export default React_Select_Field;