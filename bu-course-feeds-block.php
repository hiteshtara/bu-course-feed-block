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
function bu_course_feeds_get_courses($request)
{
	// Example mock data (ensure correct structure)
	$mock_courses = [
		['course_id' => '101', 'title' => 'Introduction to Programming', 'college' => 'ENG', 'department' => 'CS'],
		['course_id' => '102', 'title' => 'Advanced Algorithms', 'college' => 'ENG', 'department' => 'CS'],
		['course_id' => '201', 'title' => 'Linear Algebra', 'college' => 'SCI', 'department' => 'MATH'],
		['course_id' => '202', 'title' => 'Calculus I', 'college' => 'SCI', 'department' => 'MATH'],
		['course_id' => '203', 'title' => 'Calculus II', 'college' => 'SCI', 'department' => 'MATH'],
		['course_id' => '301', 'title' => 'Physics I', 'college' => 'SCI', 'department' => 'PHYS'],
		['course_id' => '302', 'title' => 'Physics II', 'college' => 'SCI', 'department' => 'PHYS'],
		['course_id' => '401', 'title' => 'Introduction to Psychology', 'college' => 'ARTS', 'department' => 'PSY'],
		['course_id' => '402', 'title' => 'Cognitive Psychology', 'college' => 'ARTS', 'department' => 'PSY'],
		['course_id' => '501', 'title' => 'World History', 'college' => 'ARTS', 'department' => 'HIST'],
		['course_id' => '502', 'title' => 'European History', 'college' => 'ARTS', 'department' => 'HIST'],
		['course_id' => '601', 'title' => 'Marketing 101', 'college' => 'BUS', 'department' => 'MKT'],
		['course_id' => '602', 'title' => 'Advanced Marketing', 'college' => 'BUS', 'department' => 'MKT'],
		['course_id' => '701', 'title' => 'Financial Accounting', 'college' => 'BUS', 'department' => 'FIN'],
		['course_id' => '702', 'title' => 'Corporate Finance', 'college' => 'BUS', 'department' => 'FIN'],
		['course_id' => '801', 'title' => 'Environmental Science', 'college' => 'SCI', 'department' => 'ENVS'],
		['course_id' => '802', 'title' => 'Climate Change Studies', 'college' => 'SCI', 'department' => 'ENVS'],
		['course_id' => '901', 'title' => 'Artificial Intelligence', 'college' => 'ENG', 'department' => 'CS'],
		['course_id' => '902', 'title' => 'Machine Learning', 'college' => 'ENG', 'department' => 'CS'],
		['course_id' => '903', 'title' => 'Data Structures', 'college' => 'ENG', 'department' => 'CS'],
	];

	if (empty($courses)) {
		return '<p>No courses found for the specified filters.</p>';
	}

	// Simulate filtering based on $request parameters
	$filtered_courses = array_filter($mock_courses, function ($course) use ($request) {
		$college = $request['college'] ?? '';
		$department = $request['department'] ?? '';
		return (!$college || $course['college'] === $college) &&
			(!$department || $course['department'] === $department);
	});

	return array_values($filtered_courses); // Ensure re-indexed array
}

// Custom function to fetch courses


// Render callback for the Gutenberg block
function bu_course_feeds_render_block($attributes)
{
	$college = isset($attributes['college']) ? sanitize_text_field($attributes['college']) : '';
	$department = isset($attributes['department']) ? sanitize_text_field($attributes['department']) : '';

	// Fetch courses
	$courses = bu_course_feeds_get_courses(['college' => $college, 'department' => $department]);

	if (is_wp_error($courses)) {
		return '<p>Error: ' . esc_html($courses->get_error_message()) . '</p>';
	}

	// Debugging output
	ob_start();
?>
	<div class="bu-course-feeds">
		<h3>Course Feeds</h3>
		<ul>
			<?php foreach ($courses as $course): ?>
				<li>
					<?php echo esc_html($course['title'] ?? 'No Title'); ?>
					(<?php echo esc_html($course['course_id'] ?? 'No ID'); ?>)
				</li>
			<?php endforeach; ?>
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
