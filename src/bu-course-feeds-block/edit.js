import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Spinner, Notice } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { college, department } = attributes;

    // Mock courses data
    const mockCourses = [
        { course_id: 'CS101', title: 'Introduction to Programming', college: 'ENG', department: 'CS' },
        { course_id: 'CS102', title: 'Advanced Algorithms', college: 'ENG', department: 'CS' },
        { course_id: 'EE201', title: 'Circuit Analysis', college: 'ENG', department: 'EE' },
        { course_id: 'MATH201', title: 'Linear Algebra', college: 'SCI', department: 'MATH' },
        { course_id: 'PHYS301', title: 'Physics I', college: 'SCI', department: 'PHYS' },
        { course_id: 'PSY101', title: 'Introduction to Psychology', college: 'ARTS', department: 'PSY' },
        { course_id: 'HIST501', title: 'World History', college: 'ARTS', department: 'HIST' },
    ];

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch courses based on selected college and department
    useEffect(() => {
        if (!college && !department) {
            setError('Please specify a college or department.');
            setCourses([]);
            return;
        }

        setLoading(true);
        setError(null);

        // Simulate an API call with a delay using mock data
        setTimeout(() => {
            const filteredCourses = mockCourses.filter((course) => {
                const matchesCollege = college ? course.college === college : true;
                const matchesDepartment = department ? course.department === department : true;
                return matchesCollege && matchesDepartment;
            });

            if (filteredCourses.length > 0) {
                setCourses(filteredCourses);
                setError(null);
            } else {
                setCourses([]);
                setError('No courses found for the specified filters.');
            }

            setLoading(false);
        }, 500); // Simulating network delay
    }, [college, department]);

    return (
        <div {...useBlockProps()}>
            {/* Block settings in the sidebar */}
            <InspectorControls>
                <PanelBody title="Course Feed Settings">
                    {/* College input */}
                    <TextControl
                        label="College"
                        value={college || ''}
                        onChange={(value) => setAttributes({ college: value })}
                        placeholder="Enter college code (e.g., ENG)"
                    />
                    {/* Department input */}
                    <TextControl
                        label="Department"
                        value={department || ''}
                        onChange={(value) => setAttributes({ department: value })}
                        placeholder="Enter department code (e.g., CS)"
                    />
                </PanelBody>
            </InspectorControls>

            {/* Block content */}
            <h3>BU Course Feeds</h3>
            {loading && <Spinner />}
            {error && <Notice status="error" isDismissible>{error}</Notice>}
            <ul>
                {courses.map((course) => (
                    <li key={course.course_id}>
                        {course.title} ({course.course_id})
                    </li>
                ))}
            </ul>
        </div>
    );
}
