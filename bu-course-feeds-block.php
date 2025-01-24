<?php

/**
 * Plugin Name: BU Course Feeds Block
 * Description: A plugin to fetch and display BU course feeds via a Gutenberg block. Includes a REST API route for fetching course data.
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// Prevent direct file access
if (!defined('ABSPATH')) {
	exit;
}

// Helper function to load mock data from the external file
function bu_course_feeds_load_mock_data()
{
	$mock_data_path = plugin_dir_path(__FILE__) . 'mock-data.php';

	if (file_exists($mock_data_path)) {
		return include $mock_data_path;
	}

	return [];
}

// Register the REST API route
add_action('rest_api_init', function () {
	register_rest_route('bu-course-feeds/v1', '/courses', [
		'methods'             => 'GET',
		'callback'            => 'bu_course_feeds_get_courses',
		'permission_callback' => '__return_true', // Allow public access
	]);
});

/**
 * Fetch course data based on filters (college and department).
 *
 * @param WP_REST_Request $request REST API request object.
 * @return array Filtered list of courses.
 */
function bu_course_feeds_get_courses(WP_REST_Request $request)
{
	// Load mock data
	$mock_courses = bu_course_feeds_load_mock_data();

	// Get query parameters
	$college = $request->get_param('college') ?? '';
	$department = $request->get_param('department') ?? '';

	// Filter courses based on query parameters
	return array_filter($mock_courses, function ($course) use ($college, $department) {
		return (!$college || $course['college'] === $college) &&
			(!$department || $course['department'] === $department);
	});
}

// Render callback for the Gutenberg block
function bu_course_feeds_render_block($attributes)
{
	// Load mock data
	$mock_courses = bu_course_feeds_load_mock_data();

	// Sanitize attributes
	$college    = isset($attributes['college']) ? sanitize_text_field($attributes['college']) : '';
	$department = isset($attributes['department']) ? sanitize_text_field($attributes['department']) : '';
	$courseId   = isset($attributes['courseId']) ? sanitize_text_field($attributes['courseId']) : '';

	// Filter courses
	$filtered_courses = array_filter($mock_courses, function ($course) use ($college, $department) {
		return (!$college || $course['college'] === $college) &&
			(!$department || $course['department'] === $department);
	});

	// Generate HTML for the block
	ob_start();
?>
	<div class="bu-course-feeds">
		<h3>Course Feeds</h3>
		<p><strong>College:</strong> <?php echo esc_html($college ?: 'None'); ?></p>
		<p><strong>Department:</strong> <?php echo esc_html($department ?: 'None'); ?></p>
		<p><strong>Selected Course:</strong> <?php echo esc_html($courseId ?: 'None'); ?></p>

		<ul>
			<?php if (!empty($filtered_courses)) : ?>
				<?php foreach ($filtered_courses as $course) : ?>
					<li><?php echo esc_html($course['title'] . ' (' . $course['course_id'] . ')'); ?></li>
				<?php endforeach; ?>
			<?php else : ?>
				<li>No courses found for the selected filters.</li>
			<?php endif; ?>
		</ul>
	</div>
<?php
	return ob_get_clean();
}

// Register the Gutenberg block
add_action('init', function () {
	// Define block settings and attributes
	register_block_type(__DIR__ . '/build/bu-course-feeds-block', [
		'attributes' => [
			'college' => [
				'type'    => 'string',
				'default' => '',
			],
			'department' => [
				'type'    => 'string',
				'default' => '',
			],
			'courseId' => [
				'type'    => 'string',
				'default' => '',
			],
		],
		'render_callback' => 'bu_course_feeds_render_block',
	]);
});
