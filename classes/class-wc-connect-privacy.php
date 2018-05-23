<?php

if ( class_exists( 'WC_Connect_Privacy' ) ) {
	return;
}

class WC_Connect_Privacy {
	/**
	 * @var WC_Connect_Service_Settings_Store
	 */
	protected $settings_store;

	/**
	 * @var WC_Connect_API_Client
	 */
	protected $api_client;

	public function __construct( WC_Connect_Service_Settings_Store $settings_store, WC_Connect_API_Client $api_client ) {
		$this->settings_store = $settings_store;
		$this->api_client = $api_client;

		add_action( 'admin_init', array( $this, 'add_privacy_message' ) );
		add_filter( 'woocommerce_privacy_export_order_personal_data', array( $this, 'label_data_exporter' ), 10, 2 );
		add_action( 'woocommerce_privacy_before_remove_order_personal_data', array( $this, 'label_data_eraser' ) );
	}

	/**
	 * Gets the privacy message to display in the admin panel
	 */
	public function add_privacy_message() {
		if ( ! function_exists( 'wp_add_privacy_policy_content' ) ) {
			return;
		}

		$title = __( 'WooCommerce Services', 'woocommerce-services' );
		$content = wpautop(
			sprintf(
				wp_kses(
					__( 'By using this extension, you may be storing personal data or sharing data with external services. <a href="%s" target="_blank">Learn more about how this works, including what you may want to include in your privacy policy.</a>', 'woocommerce-services' ),
					array( 'a' => array( 'href' => array(), 'target' => array() ) )
				),
				'https://jetpack.com/support/for-your-privacy-policy/#woocommerce-services'
			)
		);

		wp_add_privacy_policy_content( $title, $content );
	}

	/**
	 * Filter for woocommerce_privacy_export_order_personal_data that adds WCS personal data to the exported orders
	 * @param array  $personal_data
	 * @param object $order
	 * @return array
	 */
	public function label_data_exporter( $personal_data, $order ) {
		$order_id = $order->get_id();
		$labels = $this->settings_store->get_label_order_meta_data( $order_id );

		foreach ( $labels as $label ) {
			if ( empty( $label['tracking'] ) ) {
				continue;
			}
			$personal_data[] = array(
				'name'  => __( 'Shipping label service', 'woocommerce-services' ),
				'value' => $label['service_name'],
			);
			$personal_data[] = array(
				'name'  => __( 'Shipping label tracking number', 'woocommerce-services' ),
				'value' => $label['tracking'],
			);
		}

		return $personal_data;
	}

	/**
	 * Hooks into woocommerce_privacy_before_remove_order_personal_data to remove WCS personal data from orders
	 * @param object $order
	 */
	public function label_data_eraser( $order ) {
		$order_id = $order->get_id();
		$labels = $this->settings_store->get_label_order_meta_data( $order_id );
		if ( empty( $labels ) ) {
			return;
		}

		foreach ( $labels as $label_idx => $label ) {
			$labels[ $label_idx ]['tracking'] = '';
			$labels[ $label_idx ]['status'] = 'ANONYMIZED';
		}

		$this->api_client->anonymize_order( $order_id );

		update_post_meta( $order_id, 'wc_connect_labels', $labels );
	}
}