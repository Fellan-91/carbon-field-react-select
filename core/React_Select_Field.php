<?php

namespace Carbon_Field_React_Select;

use Carbon_Fields\Field\Select_Field;

class React_Select_Field extends Select_Field {
    /**
     * Placeholder string
     *
     * @var string
     */
    protected $placeholder = '';

	/**
	 * Prepare the field type for use
	 * Called once per field type when activated
	 */
	public static function field_type_activated() {
		$dir = \Carbon_Field_React_Select\DIR . '/languages/';
		$locale = get_locale();
		$path = $dir . $locale . '.mo';
		load_textdomain( 'carbon-field-react-select', $path );
	}

	/**
	 * Enqueue scripts and styles in admin
	 * Called once per field type
	 */
	public static function admin_enqueue_scripts() {
		$root_uri = \Carbon_Fields\Carbon_Fields::directory_to_url( \Carbon_Field_React_Select\DIR );

        // Carbon React_Select Field
        wp_enqueue_script( 'carbon-field-react-select', $root_uri . '/assets/js/bundle.js', array( 'carbon-fields-boot' ) );
        wp_enqueue_style( 'carbon-field-react-select', $root_uri . '/assets/css/field.css' );
	}

    /**
     * {@inheritDoc}
     */
    public function to_json( $load ) {
        $field_data = parent::to_json( $load );
        $options = $this->parse_options( $this->get_options(), true );
        $value = strval( $this->get_formatted_value() );
        $field_data = array_merge( $field_data, array(
            'value'       => strval( $value ),
            'options'     => $options,
            'placeholder' => $this->get_placeholder(),
        ) );
        return $field_data;
    }

    /**
     * Changes the options array structure. This is needed to keep the array items order when it is JSON encoded.
     * Will also work with a callable that returns an array.
     *
     * @param array|callable $options
     * @return array
     */
    protected function parse_options( $options, $stringify_value = false ) {
        $parsed = array();
        if ( is_callable( $options ) ) {
            $options = call_user_func( $options );
        }
        foreach ( $options as $key => $value ) {
            $parsed[] = array(
                'value' => $stringify_value ? strval( $key ) : $key,
                'label' => strval( $value ),
            );
        }
        return $parsed;
    }

    /**
     * Get placeholder
     *
     * @return string
     */
    public function get_placeholder() {
        return $this->placeholder;
    }

    /**
     * Set placeholder
     *
     * @param  string   $placeholder
     * @return self     $this
     */
    public function set_placeholder( $placeholder ) {
        $this->placeholder = $placeholder;
        return $this;
    }
}