import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Spinner, Notice } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { college, department } = attributes;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!college && !department) {
            setError('Please specify a college or department.');
            setCourses([]);
            return;
        }

        setLoading(true);
        setError(null);

        wp.apiFetch({
            path: `/wp-json/bu-course-feeds/v1/courses?college=${college}&department=${department}`,
        })
            .then((data) => {
                if (data && data.length) {
                    setCourses(data);
                } else {
                    setCourses([]);
                    setError('No courses found for the specified filters.');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to retrieve course data. Please try again later.');
                setLoading(false);
            });
    }, [college, department]);

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody title="Course Feed Settings">
                    <TextControl
                        label="College"
                        value={college}
                        onChange={(value) => setAttributes({ college: value })}
                        placeholder="Enter college code (e.g., ENG)"
                    />
                    <TextControl
                        label="Department"
                        value={department}
                        onChange={(value) => setAttributes({ department: value })}
                        placeholder="Enter department code (e.g., CS)"
                    />
                </PanelBody>
            </InspectorControls>

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
