<?php

/**
 * Plugin Name: BU Course Feeds Block
 * The route /wp-json/bu-course-feeds/v1/courses is registered to fetch course data.Accepts college and department as query parameters.
 * Replace $mock_courses with your actual API call or database query logic.
 * Block Rendering:he block fetches course data based on attributes like college and department.

 * Generates HTML output dynamically.
 * /wp-json/bu-course-feeds/v1/courses?college=ENG&department=CS

 * Gutenberg Block: Use the block and pass the attributes (college and department) via the editor.


 * 
 * 
 * Description: A simple plugin to fetch and display BU course feeds without using classes.
 */

// Register the REST API route
add_action('rest_api_init', function () {
	register_rest_route('bu-course-feeds/v1', '/courses', [
		'methods' => 'GET',
		'callback' => 'bu_course_feeds_get_courses',
		'permission_callback' => '__return_true', // Allow public access
	]);
});
function bu_course_feeds_get_courses($filters)
{
	// Mock data
	$mock_courses = [
		['course_id' => 'CS101', 'title' => 'Introduction to Programming', 'college' => 'ENG', 'department' => 'CS'],
		['course_id' => 'CS102', 'title' => 'Advanced Algorithms', 'college' => 'ENG', 'department' => 'CS'],
		['course_id' => 'EE201', 'title' => 'Circuit Analysis', 'college' => 'ENG', 'department' => 'EE'],
		['course_id' => 'MATH201', 'title' => 'Linear Algebra', 'college' => 'SCI', 'department' => 'MATH'],
		['course_id' => 'PHYS301', 'title' => 'Physics I', 'college' => 'SCI', 'department' => 'PHYS'],
		['course_id' => 'PSY101', 'title' => 'Introduction to Psychology', 'college' => 'ARTS', 'department' => 'PSY'],
	];

	// Default to empty strings if filters are not set
	$college = $filters['college'] ?? '';
	$department = $filters['department'] ?? '';

	// Filter courses
	return array_filter($mock_courses, function ($course) use ($college, $department) {
		return (!$college || $course['college'] === $college) &&
			(!$department || $course['department'] === $department);
	});
}


// Custom function to fetch courses


// Render callback for the Gutenberg block
function bu_course_feeds_render_block($attributes)
{
	// Ensure keys exist
	$college = !empty($attributes['college']) ? sanitize_text_field($attributes['college']) : '';
	$department = !empty($attributes['department']) ? sanitize_text_field($attributes['department']) : '';

	// Mock or real data fetching
	$courses = bu_course_feeds_get_courses(['college' => $college, 'department' => $department]);

	// Ensure $courses is an array
	if (!is_array($courses)) {
		$courses = [];
	}

	ob_start();
?>
	<div class="bu-course-feeds">
		<h3>Course Feeds</h3>
		<ul>
			<?php
			if (!empty($courses)) {
				foreach ($courses as $course) {
					echo '<li>' . esc_html($course['title'] ?? 'No Title') . ' (' . esc_html($course['course_id'] ?? 'No ID') . ')</li>';
				}
			} else {
				echo '<p>No courses found for the specified filters.</p>';
			}
			?>
		</ul>
	</div>
<?php
	return ob_get_clean();
}





// Register the Gutenberg block
add_action('init', function () {
	register_block_type(__DIR__ . '/build/bu-course-feeds-block', [
		'render_callback' => 'bu_course_feeds_render_block',
	]);
});
